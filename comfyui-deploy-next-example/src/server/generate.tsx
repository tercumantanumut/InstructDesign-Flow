"use server"

// Direct API integration with local InstructDesign backend
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface GenerationConfig {
    positive_prompt: string;
    negative_prompt?: string;
    input_image: string; // URL, filename, or base64
    seed?: number;
    steps?: number;
    cfg?: number;
    guidance?: number;
    sampler_name?: string;
    scheduler?: string;
    batch_size?: number;
    return_base64?: boolean;
}

export interface GenerationResponse {
    prompt_id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    images?: string[];
    images_base64?: string[];
    error?: string;
}

// Main generation function
export async function generateTransformation(config: GenerationConfig) {
    try {
        const response = await fetch(`${API_BASE}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...config,
                return_base64: true, // Always get base64 for easy display
            }),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data: GenerationResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Generation error:', error);
        return null;
    }
}

// Check generation status (for polling)
export async function checkGenerationStatus(promptId: string) {
    try {
        const response = await fetch(`${API_BASE}/api/status/${promptId}`);

        if (!response.ok) {
            throw new Error(`Status check failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Status check error:', error);
        return null;
    }
}

// Get image by filename
export async function getImage(filename: string, format: 'file' | 'base64' = 'base64') {
    try {
        const response = await fetch(`${API_BASE}/api/images/${filename}?format=${format}`);

        if (!response.ok) {
            throw new Error(`Image fetch failed: ${response.statusText}`);
        }

        if (format === 'base64') {
            const data = await response.json();
            return data.base64;
        } else {
            return `${API_BASE}/api/images/${filename}`;
        }
    } catch (error) {
        console.error('Image fetch error:', error);
        return null;
    }
}

// Get queue status
export async function getQueueStatus() {
    try {
        const response = await fetch(`${API_BASE}/api/queue/status`);

        if (!response.ok) {
            throw new Error(`Queue status failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Queue status error:', error);
        return null;
    }
}

// WebSocket URL for real-time updates
export async function getWebsocketUrl(promptId: string) {
    // Convert HTTP to WS protocol
    const wsBase = API_BASE.replace('http://', 'ws://').replace('https://', 'wss://');
    return `${wsBase}/ws/${promptId}`;
}