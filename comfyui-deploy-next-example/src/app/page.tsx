"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, ChevronRight } from "lucide-react";
import { generateTransformation, checkGenerationStatus } from "@/server/generate";
import { TRANSFORMATION_PRESETS } from "@/lib/constants";
import { ModernLoader } from "@/components/ModernLoader";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [inputImage, setInputImage] = useState("");
  const [outputImage, setOutputImage] = useState("");
  const [prompt, setPrompt] = useState("");
  const [seed, setSeed] = useState(-1);
  const [steps, setSteps] = useState(20);
  const [cfg, setCfg] = useState(1.0);
  const [guidance, setGuidance] = useState(5.0);
  const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await fileToBase64(file);
      setInputImage(base64);
    }
  };

  // Apply preset
  const applyPreset = (key: string) => {
    const preset = TRANSFORMATION_PRESETS[key as keyof typeof TRANSFORMATION_PRESETS];
    if (preset) {
      setPrompt(preset.positive_prompt);
      setCfg(preset.cfg);
      setGuidance(preset.guidance);
    }
  };

  // Toggle category collapse
  const toggleCategory = (category: string) => {
    const newCollapsed = new Set(collapsedCategories);
    if (newCollapsed.has(category)) {
      newCollapsed.delete(category);
    } else {
      newCollapsed.add(category);
    }
    setCollapsedCategories(newCollapsed);
  };

  // Generate transformation
  const handleGenerate = async () => {
    if (!inputImage || !prompt) {
      setStatus("Please provide an image and prompt");
      return;
    }

    setLoading(true);
    setStatus("Preparing your transformation...");
    setOutputImage("");
    setProgress(10);

    try {
      const response = await generateTransformation({
        positive_prompt: prompt,
        input_image: inputImage,
        seed: seed === -1 ? undefined : seed,
        steps,
        cfg,
        guidance,
        sampler_name: "euler",
        scheduler: "simple",
        return_base64: true,
      });

      if (!response) {
        throw new Error("Generation failed");
      }

      if (response.status === 'completed' && response.images_base64?.[0]) {
        setOutputImage(response.images_base64[0]);
        setStatus("Complete!");
        setLoading(false);
      } else {
        // Poll for completion
        setProgress(20);
        setStatus("Applying AI magic...");
        pollForResult(response.prompt_id);
      }
    } catch (error) {
      console.error("Generation error:", error);
      setStatus(`Error: ${error}`);
      setLoading(false);
    }
  };

  // Poll for result
  const pollForResult = useCallback(async (promptId: string) => {
    let currentProgress = 20;
    const interval = setInterval(async () => {
      try {
        // Increment progress gradually
        currentProgress = Math.min(currentProgress + 10, 90);
        setProgress(currentProgress);

        const result = await checkGenerationStatus(promptId);

        if (result?.status === 'completed') {
          if (result.images_base64?.[0]) {
            setProgress(100);
            setStatus("Almost there...");
            setTimeout(() => {
              setOutputImage(result.images_base64[0]);
              setStatus("Complete!");
              setLoading(false);
              setProgress(0);
            }, 500);
            clearInterval(interval);
          }
        } else if (result?.status === 'failed') {
          setStatus("Generation failed");
          setLoading(false);
          setProgress(0);
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Polling error:", error);
        setProgress(0);
        clearInterval(interval);
      }
    }, 2000);

    // Timeout after 2 minutes
    setTimeout(() => {
      clearInterval(interval);
      if (loading) {
        setStatus("Timeout");
        setLoading(false);
      }
    }, 120000);
  }, [loading]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <div>
        <div className="container mx-auto px-4 max-w-7xl py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div>
              <h1 className="text-2xl font-bold" style={{ color: '#FAFF00' }}>
                InstructDesign Flow
              </h1>
              <p className="text-gray-400 text-xs">Transform web interfaces with natural language</p>
            </div>

            {/* Hackathon Badge */}
            <div className="flex items-center gap-3">
              <a
                href="https://bfl-kontext-dev.devpost.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-purple-500/30 hover:border-purple-400 transition-colors"
              >
                <span className="text-xs font-semibold text-purple-300">🏆 FLUX.1 Kontext Hackathon</span>
              </a>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700">LoRA</span>
                <span className="px-2 py-1 bg-gray-800 rounded border border-gray-700">v4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl">
        <Tabs defaultValue="playground" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="playground">Playground</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          {/* Playground Tab */}
          <TabsContent value="playground">
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Input Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Input</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Image Input */}
                  <div>
                    <Label className="text-sm">Image</Label>
                    <div className="min-h-[250px] bg-black relative mb-2 rounded overflow-hidden">
                      {inputImage ? (
                        <img
                          src={inputImage}
                          alt="Input"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <p className="text-gray-400">
                            Upload or paste an image URL
                          </p>
                        </div>
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="mb-2"
                    />
                    <Input
                      type="url"
                      placeholder="Or paste image URL..."
                      value={typeof inputImage === 'string' && !inputImage.startsWith('data:') ? inputImage : ''}
                      onChange={(e) => setInputImage(e.target.value)}
                    />
                  </div>

                  {/* Prompt */}
                  <div>
                    <Label className="text-sm">Transformation Prompt</Label>
                    <Textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the transformation..."
                      rows={2}
                    />

                    {/* Presets */}
                    <div className="mt-3">
                      <Label className="text-sm font-medium mb-2">Quick Presets</Label>
                      <div className="max-h-[200px] overflow-y-auto border border-gray-600 rounded-lg p-2 bg-gray-800">
                        {(() => {
                          const categories = Array.from(new Set(Object.values(TRANSFORMATION_PRESETS).map(p => p.category)));
                          return categories.map(category => (
                            <div key={category} className="mb-1">
                              <button
                                onClick={() => toggleCategory(category)}
                                className="flex items-center gap-1 w-full text-left text-xs font-semibold text-gray-300 hover:text-white py-1"
                              >
                                {collapsedCategories.has(category) ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                {category}
                              </button>
                              {!collapsedCategories.has(category) && (
                                <div className="flex flex-wrap gap-1 pl-4 py-1">
                                  {Object.entries(TRANSFORMATION_PRESETS)
                                    .filter(([_, preset]) => preset.category === category)
                                    .map(([key, preset]) => (
                                      <Badge
                                        key={key}
                                        variant="secondary"
                                        className="cursor-pointer hover:bg-yellow-400 hover:text-black transition-colors text-[10px] py-0 px-1.5 h-5"
                                        onClick={() => applyPreset(key)}
                                      >
                                        {preset.display_name}
                                      </Badge>
                                    ))}
                                </div>
                              )}
                            </div>
                          ));
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Settings */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Steps</Label>
                      <Input
                        type="number"
                        value={steps}
                        onChange={(e) => setSteps(parseInt(e.target.value) || 20)}
                        min={1}
                        max={50}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Seed</Label>
                      <Input
                        type="number"
                        value={seed}
                        onChange={(e) => setSeed(parseInt(e.target.value) || -1)}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">CFG</Label>
                      <Input
                        type="number"
                        value={cfg}
                        onChange={(e) => setCfg(parseFloat(e.target.value) || 1.0)}
                        min={0.1}
                        max={10}
                        step={0.1}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Guidance</Label>
                      <Input
                        type="number"
                        value={guidance}
                        onChange={(e) => setGuidance(parseFloat(e.target.value) || 5.0)}
                        min={0}
                        max={20}
                        step={0.5}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>

                  {/* Generate Button */}
                  <Button
                    onClick={handleGenerate}
                    disabled={loading || !inputImage || !prompt}
                    className="w-full h-9"
                    style={{ backgroundColor: loading ? '#666' : '#FAFF00', color: '#000' }}
                  >
                    {loading ? "Generating..." : "Generate Transformation"}
                  </Button>

                  {/* Status */}
                  {status && (
                    <div className="text-center text-sm p-2 bg-gray-800 text-gray-300 rounded">
                      {status}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Output Card */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Output</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="min-h-[300px] bg-black relative">
                    {outputImage ? (
                      <img
                        src={outputImage}
                        alt="Output"
                        className="w-full h-full object-contain"
                      />
                    ) : loading ? (
                      <ModernLoader status={status} progress={progress} />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-6">
                        <p className="text-gray-400 mb-4">
                          Your transformed design will appear here
                        </p>

                        {/* Prompting Guide - Inline in Output */}
                        <div className="w-full max-w-md bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                          <h4 className="text-sm font-semibold text-yellow-400 mb-3">✨ Prompting Tips</h4>

                          <div className="space-y-3 text-xs">
                            <div>
                              <p className="text-gray-300 font-medium mb-1">🎯 Reference Content:</p>
                              <p className="text-gray-500">"CEO photos" • "navigation" • "hero section"</p>
                            </div>

                            <div>
                              <p className="text-gray-300 font-medium mb-1">🎨 Use Style Keywords:</p>
                              <div className="grid grid-cols-2 gap-1 text-gray-500">
                                <span>• cyberpunk_2077</span>
                                <span>• studio_ghibli</span>
                                <span>• matrix_digital</span>
                                <span>• lego_brick</span>
                              </div>
                            </div>

                            <div>
                              <p className="text-gray-300 font-medium mb-1">📝 Example:</p>
                              <p className="text-gray-500 italic">
                                "Transform to cyberpunk_2077 aesthetic with neon accents"
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {outputImage && (
                    <div className="flex gap-2 p-4">
                      <Button
                        className="flex-1"
                        variant="outline"
                        onClick={() => {
                          setInputImage(outputImage);
                          setOutputImage("");
                        }}
                      >
                        Reuse this image
                      </Button>
                      <Button
                        className="flex-1"
                        variant="outline"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = outputImage;
                          link.download = 'transformation.png';
                          link.click();
                        }}
                      >
                        Download
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dark Mode</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Transform interfaces to modern dark mode
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setPrompt("Transform this interface to dark mode with modern aesthetics");
                      setSeed(42);
                    }}
                  >
                    Try This
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Glassmorphism</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Add frosted glass effects
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setPrompt("Add glassmorphism effects with frosted glass and transparency");
                      setSeed(123);
                    }}
                  >
                    Try This
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mobile Optimized</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Optimize for mobile devices
                  </p>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setPrompt("Optimize for mobile devices with touch-friendly interface");
                      setSeed(456);
                    }}
                  >
                    Try This
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 mt-8">
        <div className="container mx-auto px-4 max-w-7xl py-6">
          {/* Hackathon Banner */}
          <div className="text-center mb-4">
            <a
              href="https://bfl-kontext-dev.devpost.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-purple-500/30 mb-2 hover:border-purple-400 transition-colors"
            >
              <span className="text-xs font-semibold text-purple-300">🏆 FLUX.1 Kontext [dev] Hackathon</span>
              <span className="text-xs text-gray-400">$5,000 in prizes</span>
            </a>
            <p className="text-xs text-gray-400">Competing for: Best Overall • Best LoRA • Most Creative Vision • Best Local Use Case</p>
          </div>

          {/* Project Summary */}
          <div className="grid md:grid-cols-3 gap-4 mb-6 text-xs">
            <div className="text-center">
              <div className="text-yellow-400 font-semibold mb-1">937 Training Pairs</div>
              <div className="text-gray-400">7 days of development</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-semibold mb-1">7 Transform Categories</div>
              <div className="text-gray-400">UI/UX, Styles, Mockups, Colors</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 font-semibold mb-1">Production Ready</div>
              <div className="text-gray-400">Docker + API + Queue System</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/tercumantanumut/instructdesign-kontext"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 hover:border-yellow-400 transition-colors group"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">GitHub</span>
            </a>
            <a
              href="https://huggingface.co/tercumantanumut/instructdesign-kontext"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 hover:border-yellow-400 transition-colors group"
            >
              <span className="text-lg">🤗</span>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">HuggingFace</span>
            </a>
            <a
              href="https://bfl.ai/blog/flux-1-kontext-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 hover:border-yellow-400 transition-colors group"
            >
              <span className="text-lg">🌲</span>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white">Black Forest Labs</span>
            </a>
          </div>

          {/* Technical Note */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-500">
              Fine-tuned FLUX.1 Kontext [dev] LoRA • Web UI transformation specialist • Natural language editing
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}