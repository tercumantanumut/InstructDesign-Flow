"""Workflow executor service for ComfyUI API integration."""

import asyncio
import json
import logging
import os
import tempfile
import typing as t
import uuid
from pathlib import Path
from typing import Any

import aiohttp
import websockets
from fastapi import HTTPException
from pydantic import BaseModel, Field

logger = logging.getLogger(__name__)


class WorkflowExecutor:
    """Executes ComfyUI workflows with parameter injection."""

    def __init__(
        self,
        comfyui_host: str = "localhost",
        comfyui_port: int = 8188,
        workflow_path: str | None = None,
        output_dir: str = os.path.join(tempfile.gettempdir(), "outputs"),
    ):
        """Initialize workflow executor.

        Args:
            comfyui_host: ComfyUI server hostname
            comfyui_port: ComfyUI server port
            workflow_path: Optional path to workflow JSON template
            output_dir: Directory for output images
        """
        self.comfyui_url = f"http://{comfyui_host}:{comfyui_port}"
        self.ws_url = f"ws://{comfyui_host}:{comfyui_port}/ws"
        self.workflow_path = Path(workflow_path) if workflow_path else None
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

        # Load workflow template if provided and exists
        self.workflow_template = None
        if self.workflow_path and self.workflow_path.exists():
            with open(self.workflow_path) as f:
                self.workflow_template = json.load(f)
            logger.info(f"Loaded workflow template from {self.workflow_path}")
        else:
            logger.info(
                "No workflow template loaded - will use workflows from database"
            )

    def inject_parameters(
        self, workflow: dict[str, Any], parameters: dict[str, Any]
    ) -> dict[str, Any]:
        """Inject user parameters into workflow.

        Args:
            workflow: Workflow template
            parameters: User-provided parameters

        Returns:
            Modified workflow with injected parameters
        """
        # Deep copy to avoid modifying template
        import copy

        workflow = copy.deepcopy(workflow)

        # Parameter mapping - customize based on your workflow (API format)
        param_map = {
            # Text prompts
            "positive_prompt": ("6", "inputs", "text"),  # Node 6 is positive prompt
            "negative_prompt": ("261", "inputs", "text"),  # Node 261 is negative prompt
            # Input image
            "input_image": ("248", "inputs", "image"),  # Node 248 is LoadImage
            # Generation settings
            "seed": ("31", "inputs", "seed"),  # Node 31 is KSampler seed
            # Sampler settings
            "steps": ("31", "inputs", "steps"),  # KSampler steps
            "cfg": ("31", "inputs", "cfg"),  # KSampler cfg
            "sampler_name": ("31", "inputs", "sampler_name"),  # KSampler sampler
            "scheduler": ("31", "inputs", "scheduler"),  # KSampler scheduler
            # FluxGuidance
            "guidance": ("35", "inputs", "guidance"),  # Node 35 is FluxGuidance
            # LoRA strength
            "lora_strength": ("249", "inputs", "strength_model"),  # Node 249 is LoraLoader
        }

        # First, generic mapping: if a parameter name matches an input field in any node
        for param_name, param_value in parameters.items():
            applied = False
            # Known aliases
            if param_name == "prompt":
                # Inject into all CLIPTextEncode text inputs
                for node in workflow.values():
                    if (
                        isinstance(node, dict)
                        and node.get("class_type") == "CLIPTextEncode"
                    ):
                        node.setdefault("inputs", {})
                        node["inputs"]["text"] = param_value
                        applied = True
            if param_name == "saveimage_filename_prefix":
                for node in workflow.values():
                    if isinstance(node, dict) and node.get("class_type") == "SaveImage":
                        node.setdefault("inputs", {})
                        node["inputs"]["filename_prefix"] = param_value
                        applied = True

            # Direct input name match
            for node in workflow.values():
                if not isinstance(node, dict):
                    continue
                inputs = node.get("inputs", {})
                if param_name in inputs and not (
                    isinstance(inputs[param_name], list)
                    and len(inputs[param_name]) == 2
                ):
                    inputs[param_name] = param_value
                    applied = True
            # Fallback to hardcoded mapping if still not applied
            if not applied and param_name in param_map:
                node_id, *path = param_map[param_name]
                # API format - nodes are at top level
                if node_id in workflow:
                    target = workflow[node_id]
                    for key in path[:-1]:
                        target = target.setdefault(key, {})
                    target[path[-1]] = param_value
                    applied = True
            if applied:
                logger.info(f"Injected {param_name} into workflow")

        return workflow

    async def submit_workflow(
        self, workflow: dict[str, Any], client_id: str | None = None
    ) -> str:
        """Submit workflow to ComfyUI.

        Args:
            workflow: Workflow to execute
            client_id: Optional client ID for WebSocket updates

        Returns:
            Prompt ID for tracking execution
        """
        if not client_id:
            client_id = str(uuid.uuid4())

        prompt_data = {"prompt": workflow, "client_id": client_id}

        # Log what we're sending for debugging
        import json

        logger.info(
            f"Submitting workflow to ComfyUI: {json.dumps(list(workflow.keys())[:5])}"
        )

        async with (
            aiohttp.ClientSession() as session,
            session.post(f"{self.comfyui_url}/prompt", json=prompt_data) as response,
        ):
            if response.status != 200:
                error = await response.text()
                raise HTTPException(
                    status_code=response.status, detail=f"ComfyUI error: {error}"
                )

            result = await response.json()
            prompt_id = t.cast(str | None, result.get("prompt_id"))

            if not prompt_id:
                raise HTTPException(
                    status_code=500, detail="No prompt_id returned from ComfyUI"
                )

            logger.info(f"Submitted workflow with prompt_id: {prompt_id}")
            return prompt_id

    async def get_status(self, prompt_id: str) -> dict[str, Any]:
        """Get workflow execution status.

        Args:
            prompt_id: Prompt ID to check

        Returns:
            Status information
        """
        async with aiohttp.ClientSession() as session:
            # Check queue
            async with session.get(f"{self.comfyui_url}/queue") as response:
                queue = await response.json()

                # Check if running
                for item in queue.get("queue_running", []):
                    if item[1] == prompt_id:
                        return {
                            "status": "running",
                            "prompt_id": prompt_id,
                            "position": 0,
                        }

                # Check if pending
                for i, item in enumerate(queue.get("queue_pending", [])):
                    if item[1] == prompt_id:
                        return {
                            "status": "pending",
                            "prompt_id": prompt_id,
                            "position": i + 1,
                        }

            # Check history for completion
            async with session.get(
                f"{self.comfyui_url}/history/{prompt_id}"
            ) as response:
                history = await response.json()

                if prompt_id in history:
                    execution = history[prompt_id]
                    status = execution.get("status", {})

                    if status.get("completed"):
                        return {
                            "status": "completed",
                            "prompt_id": prompt_id,
                            "outputs": execution.get("outputs", {}),
                        }
                    else:
                        return {
                            "status": "failed",
                            "prompt_id": prompt_id,
                            "error": status.get("messages", []),
                        }

        return {"status": "unknown", "prompt_id": prompt_id}

    async def get_images(self, prompt_id: str) -> list[str]:
        """Get generated images from completed workflow.

        Args:
            prompt_id: Prompt ID of completed workflow

        Returns:
            List of image URLs/paths
        """
        status = await self.get_status(prompt_id)

        if status["status"] != "completed":
            raise HTTPException(
                status_code=400, detail=f"Workflow not completed: {status['status']}"
            )

        images = []
        outputs = status.get("outputs", {})

        # Extract image outputs
        for _node_id, node_output in outputs.items():
            if "images" in node_output:
                for image in node_output["images"]:
                    filename = image.get("filename")
                    if filename:
                        # Download from ComfyUI
                        image_url = f"{self.comfyui_url}/view"
                        params = {
                            "filename": filename,
                            "type": image.get("type", "output"),
                            "subfolder": image.get("subfolder", ""),
                        }

                        # Save locally
                        local_path = self.output_dir / f"{prompt_id}_{filename}"

                        async with (
                            aiohttp.ClientSession() as session,
                            session.get(image_url, params=params) as response,
                        ):
                            if response.status == 200:
                                content = await response.read()
                                with open(local_path, "wb") as f:
                                    f.write(content)
                                images.append(str(local_path))

        return images

    def load_workflow(self, workflow_data: dict[str, Any]) -> None:
        """Load a workflow dynamically.

        Args:
            workflow_data: Workflow JSON data
        """
        self.workflow_template = workflow_data
        logger.info("Loaded workflow dynamically")

    async def execute_workflow(
        self,
        parameters: dict[str, Any],
        wait_for_completion: bool = True,
        timeout: float = 300.0,
        workflow_override: dict[str, Any] | None = None,
    ) -> dict[str, Any]:
        """Execute workflow with parameters.

        Args:
            parameters: User parameters to inject
            wait_for_completion: Whether to wait for completion
            timeout: Maximum time to wait (seconds)
            workflow_override: Optional workflow to use instead of template

        Returns:
            Execution result with status and outputs
        """
        # Use provided workflow or template
        base_workflow = workflow_override or self.workflow_template
        if not base_workflow:
            raise HTTPException(
                status_code=400,
                detail="No workflow available. Please provide a workflow or load a template.",
            )

        # Inject parameters into workflow
        workflow = self.inject_parameters(base_workflow, parameters)

        # Submit workflow
        prompt_id = await self.submit_workflow(workflow)

        if not wait_for_completion:
            return {"prompt_id": prompt_id, "status": "submitted"}

        # Wait for completion
        start_time = asyncio.get_event_loop().time()
        while asyncio.get_event_loop().time() - start_time < timeout:
            status = await self.get_status(prompt_id)

            if status["status"] in ["completed", "failed"]:
                if status["status"] == "completed":
                    # Get images
                    images = await self.get_images(prompt_id)
                    status["images"] = images

                return status

            await asyncio.sleep(1.0)

        raise HTTPException(
            status_code=408,
            detail=f"Workflow execution timeout after {timeout} seconds",
        )

    async def wait_for_completion(
        self, prompt_id: str, timeout: float = 300.0
    ) -> dict[str, Any]:
        """Wait for workflow completion.

        Args:
            prompt_id: Prompt ID to wait for
            timeout: Maximum time to wait (seconds)

        Returns:
            Execution result with status and outputs
        """
        start_time = asyncio.get_event_loop().time()
        while asyncio.get_event_loop().time() - start_time < timeout:
            status = await self.get_status(prompt_id)

            if status["status"] in ["completed", "failed"]:
                if status["status"] == "completed":
                    # Get images
                    images = await self.get_images(prompt_id)
                    status["images"] = images

                return status

            await asyncio.sleep(1.0)

        raise HTTPException(
            status_code=408,
            detail=f"Workflow execution timeout after {timeout} seconds",
        )

    async def stream_progress(self, prompt_id: str, websocket: Any) -> None:
        """Stream workflow progress via WebSocket.

        Args:
            prompt_id: Prompt ID to monitor
            websocket: WebSocket connection for updates
        """
        try:
            # Connect to ComfyUI WebSocket
            async with websockets.connect(self.ws_url) as comfyui_ws:
                # Monitor for updates
                while True:
                    message = await comfyui_ws.recv()
                    data = json.loads(message)

                    # Filter for our prompt_id
                    if data.get("prompt_id") == prompt_id:
                        await websocket.send_json(data)

                        # Check if completed
                        if data.get("type") == "execution_complete":
                            break

        except Exception as e:
            logger.error(f"WebSocket error: {e}")
            await websocket.send_json({"type": "error", "message": str(e)})


class WorkflowRequest(BaseModel):  # type: ignore[no-any-unimported]
    """Request model for workflow execution."""

    positive_prompt: str = Field(
        ..., description="Positive prompt for image generation"
    )
    negative_prompt: str | None = Field(
        None, description="Negative prompt for image generation"
    )
    input_image: str | None = Field(
        None, description="Base64 encoded input image or image filename"
    )
    seed: int | None = Field(-1, description="Random seed (-1 for random)")
    width: int | None = Field(1024, ge=64, le=2048, description="Image width")
    height: int | None = Field(1024, ge=64, le=2048, description="Image height")
    steps: int | None = Field(20, ge=1, le=100, description="Number of sampling steps")
    cfg: float | None = Field(7.0, ge=1.0, le=30.0, description="CFG scale")
    sampler_name: str | None = Field("euler", description="Sampler name")
    batch_size: int | None = Field(1, ge=1, le=4, description="Batch size")
    return_base64: bool | None = Field(False, description="Return images as base64 encoded strings")


class WorkflowResponse(BaseModel):  # type: ignore[no-any-unimported]
    """Response model for workflow execution."""

    prompt_id: str
    status: str
    images: list[str] | None = None
    images_base64: list[str] | None = None
    error: str | None = None
