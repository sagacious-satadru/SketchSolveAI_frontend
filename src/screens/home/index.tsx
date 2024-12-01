import React, { useState, useRef, useEffect } from "react";
import { SWATCHES } from "@/constants";
import { ColorSwatch } from "@mantine/core";
import { Button } from "@/components/ui/button";
import Draggable from "react-draggable";
import axios from "axios";

interface Response {
  expr: string;
  result: string;
  assign: boolean;
}

interface GeneratedResult {
  expression: string;
  answer: string;
}

interface Position {
  x: number;
  y: number;
}

declare global {
  interface Window {
    MathJax?: {
      tex2svg: (latex: string) => { outerHTML: string };
      startup: { defaultReady: () => void };
    };
  }
}

const ResultDisplay = ({ latex }: { latex: string }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [renderedLatex, setRenderedLatex] = useState<string>("");

  useEffect(() => {
    if (window.MathJax && window.MathJax.tex2svg) {
      const svg = window.MathJax.tex2svg(latex).outerHTML;
      setRenderedLatex(svg);
    } else {
      setRenderedLatex(latex);
    }
  }, [latex]);

  return (
    <Draggable nodeRef={nodeRef} bounds="parent">
      <div
        ref={nodeRef}
        className="latex-result relative p-6 bg-gray-800/90 rounded-xl shadow-xl backdrop-blur-md border border-gray-700 animate-fadeIn"
      >
        <div
          className="text-2xl font-medium text-white"
          dangerouslySetInnerHTML={{
            __html: renderedLatex,
          }}
        />
      </div>
    </Draggable>
  );
};

const Index = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("rgb(255, 255, 255)");
  const [reset, setReset] = useState(false);
  const [result, setResult] = useState<GeneratedResult | null>(null);
  const [latexExpressions, setLatexExpressions] = useState<Array<string>>([]);
  const [dictOfVars, setDictOfVars] = useState<{ [key: string]: number }>({});

  // Initialize MathJax
  useEffect(() => {
    const existingScript = document.getElementById("mathjax-script");
    if (existingScript) {
      existingScript.remove();
    }

    window.MathJax = {
      tex: {
        inlineMath: [["$", "$"]],
        displayMath: [["$$", "$$"]],
        packages: ["base", "ams", "noerrors", "noundefined"],
      },
      svg: {
        fontCache: "global",
        scale: 1.2, // Make equations larger
      },
      options: {
        enableMenu: false,
        processHtmlClass: "latex-result",
        skipHtmlTags: ["script", "noscript", "style", "textarea", "pre"],
      },
      startup: {
        ready: () => {
          window.MathJax?.startup?.defaultReady();
        },
      },
    };

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
    script.async = true;
    script.id = "mathjax-script";
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("mathjax-script");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", {
      willReadFrequently: true, // Performance optimization
    });
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - canvas.offsetTop;
      ctx.lineCap = "round";
      ctx.lineWidth = 5;
      ctx.fillStyle = "rgb(17, 24, 39)"; // bg-gray-900
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Handle reset
  useEffect(() => {
    if (reset) {
      resetCanvas();
      setLatexExpressions([]);
      setResult(null);
      setDictOfVars({});
      setReset(false);
    }
  }, [reset]);

  // Handle result updates
  useEffect(() => {
    if (result) {
      renderLatex(result.expression, result.answer);
    }
  }, [result]);

  const renderLatex = (expression: string, answer: string) => {
    const latex = `${expression} = ${answer}`;
    setLatexExpressions((prev) => [...prev, latex]);
  };

  const sendData = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/calculate`, {
        image: canvas.toDataURL("image/png"),
        dict_of_vars: dictOfVars,
      });

      const resp = response.data;
      console.log("API Response:", resp);

      // Update variables dictionary
      resp.data.forEach((data: Response) => {
        if (data.assign) {
          setDictOfVars((prev) => ({
            ...prev,
            [data.expr]: data.result,
          }));
        }
      });

      // Display results
      resp.data.forEach((data: Response) => {
        setResult({
          expression: data.expr,
          answer: data.result,
        });
      });

      // Reset the canvas after processing
      resetCanvas();
    } catch (error) {
      console.error("Error calculating result:", error);
    }
  };

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "rgb(17, 24, 39)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = color;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Toolbar */}
      <div className="fixed top-4 left-4 z-20 flex flex-wrap gap-4 items-center p-4 bg-gray-800/90 rounded-lg backdrop-blur-sm shadow-lg">
        <Button
          onClick={() => setReset(true)}
          className="bg-red-600 hover:bg-red-700 text-white transition-colors"
        >
          Reset
        </Button>

        <div className="flex gap-2 items-center">
          {SWATCHES.map((swatchColor: string) => (
            <ColorSwatch
              key={swatchColor}
              color={swatchColor}
              onClick={() => setColor(swatchColor)}
              style={{ cursor: "pointer" }}
              size={24}
              className="transition-transform hover:scale-110"
            />
          ))}
        </div>

        <Button
          onClick={sendData}
          className="bg-green-600 hover:bg-green-700 text-white transition-colors"
        >
          Calculate
        </Button>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-[calc(100vh-4rem)]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
          onMouseLeave={stopDrawing}
        />

        {/* Results */}
        <div className="fixed right-4 top-4 max-w-md z-10 space-y-4">
          {latexExpressions.map((latex: string, index: number) => (
            <ResultDisplay
              key={index}
              latex={latex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;