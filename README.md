# InstructDesign Flow

Transform web interfaces with natural language instructions using our fine-tuned FLUX.1 Kontext model.

## 🚀 Quick Start

### Prerequisites
- NVIDIA GPU (16GB+ VRAM)
- Docker & Docker Compose
- NVIDIA Container Toolkit

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd webflow-demo
```

2. Start the services:
```bash
docker-compose up -d
```

The API will be available at `http://localhost:8000`

## 🎨 Features

- **Natural Language Control**: Transform designs with simple text instructions
- **Multiple Input Formats**: URL, base64, or local files
- **Real-time Processing**: WebSocket support for live progress updates
- **Queue Management**: Priority-based task processing
- **Flexible Output**: File paths or base64 encoded images
- **Production Ready**: Dockerized with auto-scaling workers

## 📡 API Usage

### Basic Transformation

```bash
curl -X POST http://localhost:8000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "positive_prompt": "Transform this interface to dark mode with modern aesthetics",
    "input_image": "test_input.png",
    "seed": 42
  }'
```

### URL Input
```bash
curl -X POST http://localhost:8000/api/generate \
  -d '{
    "positive_prompt": "Add glassmorphism effects",
    "input_image": "https://images.unsplash.com/photo-xyz",
    "return_base64": true
  }'
```

### Base64 Input/Output
```bash
curl -X POST http://localhost:8000/api/generate \
  -d '{
    "positive_prompt": "Convert to neumorphic design",
    "input_image": "data:image/png;base64,iVBORw0...",
    "return_base64": true
  }'
```

## 🔧 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/generate` | POST | Generate transformation |
| `/api/status/{prompt_id}` | GET | Check generation status |
| `/api/images/{filename}` | GET | Download generated image |
| `/api/queue/status` | GET | View queue statistics |
| `/api/workers/status` | GET | Monitor worker pool |
| `/ws/{prompt_id}` | WS | Real-time progress |

### Request Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `positive_prompt` | string | required | Transformation instruction |
| `negative_prompt` | string | null | Things to avoid |
| `input_image` | string | required | Image source (file/URL/base64) |
| `seed` | integer | -1 | Random seed (-1 for random) |
| `steps` | integer | 20 | Sampling steps (1-100) |
| `cfg` | float | 1.0 | CFG scale (1-30) |
| `guidance` | float | 5.0 | Guidance strength |
| `return_base64` | boolean | false | Return base64 encoded images |

## 🎯 Transformation Capabilities

- **UI/UX Redesign**: Modernize interfaces, change layouts
- **Style Transfer**: Apply design systems (Material, iOS, etc.)
- **Theme Switching**: Dark/light mode conversions
- **Effects**: Glassmorphism, neumorphism, gradients
- **Device Mockups**: Place designs in device frames
- **Color Schemes**: Palette transformations
- **Content Updates**: Modify text and imagery

## 📁 Project Structure

```
webflow-demo/
├── docker-compose.yml      # Service orchestration
├── workflow_api.json       # ComfyUI workflow
├── inputs/                 # Input images
├── output/                 # Generated images
├── deeployd-comfy/         # API implementation
└── ComfyUI/models/         # Model weights
    ├── unet/              # flux1-kontext-dev.safetensors
    ├── loras/             # flux_kontext_lora_v4.safetensors
    ├── clip/              # Text encoders
    └── vae/               # VAE decoder
```

## 🐳 Docker Services

### ComfyUI Container
- Runs the FLUX.1 Kontext model
- Handles image generation
- GPU accelerated inference

### API Container
- FastAPI REST endpoints
- Queue management
- Worker pool orchestration
- WebSocket support

## ⚙️ Configuration

### Environment Variables
```yaml
COMFYUI_HOST: comfyui
COMFYUI_PORT: 8188
OUTPUT_DIR: /app/outputs
INPUT_DIR: /app/inputs
MAX_WORKERS: 4
TASK_TIMEOUT: 300
```

### Volume Mounts
- `./inputs`: Source images directory
- `./output`: Generated images directory
- `./ComfyUI/models`: Model weights (50GB+)

## 🔬 Model Details

- **Base Model**: FLUX.1 Kontext [dev]
- **Training Data**: 937 web interface transformation pairs
- **LoRA Checkpoint**: 10,000 steps
- **Inference Time**: ~45-70 seconds per image
- **Consistency Rate**: 85%+ instruction adherence

## 📊 Performance

- **Queue Capacity**: 1000 tasks
- **Concurrent Workers**: 1-4 (auto-scaling)
- **Priority Levels**: High, Normal, Low
- **Failed Task Retry**: 3 attempts with backoff
- **WebSocket Connections**: 100 max

## 🛠️ Development

### Building from Source
```bash
# Build ComfyUI container
cd build
./docker_build.sh

# Build API container
docker-compose build workflow-api
```

### Running Tests
```bash
# Test basic generation
curl -X POST http://localhost:8000/api/generate \
  -d @test_request.json

# Check health
curl http://localhost:8000/health
```

### Monitoring
```bash
# View logs
docker-compose logs -f

# Check queue status
curl http://localhost:8000/api/queue/status

# Monitor resources
curl http://localhost:8000/api/resources/status
```

## 📚 Documentation

- [Technical Documentation](PROJECT_DOCUMENTATION.md) - Detailed technical specs
- [API Reference](http://localhost:8000/docs) - Interactive API docs
- [DeepFloyd-Comfy](https://github.com/deepfloyd/deepfloyd-comfy) - API framework

## 🎓 Example Prompts

### Style Transformations
- "Transform this interface to dark mode with purple accents"
- "Apply material design 3 principles with rounded corners"
- "Convert to minimalist Scandinavian design aesthetic"

### Mockup Generation
- "Place this interface on an iPhone 15 Pro in a coffee shop"
- "Show this design on a MacBook Pro at a desk"
- "Create a billboard mockup in Times Square"

### UI Improvements
- "Modernize this dated interface with current design trends"
- "Improve accessibility with better contrast and larger text"
- "Add micro-interactions and hover states"

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project uses the FLUX.1 Kontext model. Please refer to the model's license for usage terms.

## 🙏 Acknowledgments

- FLUX.1 team for the base model
- ComfyUI for the inference framework
- DeepFloyd team for the API infrastructure
- 10 weeks of iterative development and training

## 🚧 Roadmap

- [ ] Web-based frontend interface
- [ ] Authentication & API keys
- [ ] Batch processing UI
- [ ] Prompt templates library
- [ ] Model versioning system
- [ ] Performance analytics dashboard

---

**Ready for Frontend Development!** The API is fully functional and tested. Next step: Building an intuitive web interface for easy access to the transformation capabilities.