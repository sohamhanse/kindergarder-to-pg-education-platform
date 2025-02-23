import { useState, useRef, useEffect } from 'react';
import { 
  Eraser, 
  Trash2, 
  Download, 
  Upload, 
  Circle, 
  Square, 
  Pencil, 
  Type,
  Palette
} from 'lucide-react';

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(2);
  const [eraserSize, setEraserSize] = useState(20);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    setContext(ctx);
  }, []);

  // Update context when color or line width changes
  useEffect(() => {
    if (context) {
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
    }
  }, [color, lineWidth, context]);

  const getCoordinates = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    const { x, y } = getCoordinates(e);
    setIsDrawing(true);
    setStartPos({ x, y });
    
    // Take a snapshot of the canvas state
    setSnapshot(context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
    
    if (tool === 'pencil' || tool === 'eraser') {
      context.beginPath();
      context.moveTo(x, y);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const { x, y } = getCoordinates(e);
    
    // Restore the snapshot before drawing new shape
    if (tool === 'circle' || tool === 'square') {
      context.putImageData(snapshot, 0, 0);
    }

    if (tool === 'eraser') {
      context.strokeStyle = '#000000';
      context.lineWidth = eraserSize;
      context.lineTo(x, y);
      context.stroke();
    } else if (tool === 'pencil') {
      context.lineTo(x, y);
      context.stroke();
    } else if (tool === 'circle') {
      const radius = Math.sqrt(
        Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2)
      );
      context.beginPath();
      context.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      context.stroke();
    } else if (tool === 'square') {
      const width = x - startPos.x;
      const height = y - startPos.y;
      context.beginPath();
      context.rect(startPos.x, startPos.y, width, height);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    context.closePath();
    
    // Reset eraser settings
    if (tool === 'eraser') {
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
    }
  };

  const clearCanvas = () => {
    context.fillStyle = '#000000';
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.strokeStyle = color;
  };

  const saveCanvas = () => {
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  const importImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Maintain aspect ratio while fitting within canvas
        const canvas = canvasRef.current;
        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        
        context.drawImage(
          img,
          x,
          y,
          img.width * scale,
          img.height * scale
        );
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-blue-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black/40 backdrop-blur-lg rounded-xl border border-blue-900/30 p-6">
          <div className="flex items-center justify-between mb-4 p-4 bg-blue-900/20 rounded-lg">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTool('pencil')}
                className={`p-2 rounded transition-colors ${tool === 'pencil' ? 'bg-blue-600' : 'bg-blue-900/40 hover:bg-blue-800/40'}`}
              >
                <Pencil size={20} className="text-white" />
              </button>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setTool('eraser')}
                  className={`p-2 rounded transition-colors ${tool === 'eraser' ? 'bg-blue-600' : 'bg-blue-900/40 hover:bg-blue-800/40'}`}
                >
                  <Eraser size={20} className="text-white" />
                </button>
                {tool === 'eraser' && (
                  <div className="flex items-center space-x-2 bg-blue-900/40 p-2 rounded">
                    <span className="text-white text-sm">Size:</span>
                    <select
                      value={eraserSize}
                      onChange={(e) => setEraserSize(parseInt(e.target.value))}
                      className="bg-blue-900/40 text-white rounded px-2 py-1 text-sm"
                    >
                      <option value="10">Small</option>
                      <option value="20">Medium</option>
                      <option value="30">Large</option>
                      <option value="50">Extra Large</option>
                    </select>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setTool('circle')}
                className={`p-2 rounded transition-colors ${tool === 'circle' ? 'bg-blue-600' : 'bg-blue-900/40 hover:bg-blue-800/40'}`}
              >
                <Circle size={20} className="text-white" />
              </button>
              
              <button
                onClick={() => setTool('square')}
                className={`p-2 rounded transition-colors ${tool === 'square' ? 'bg-blue-600' : 'bg-blue-900/40 hover:bg-blue-800/40'}`}
              >
                <Square size={20} className="text-white" />
              </button>

              <div className="flex items-center space-x-2">
                <Palette size={20} className="text-white" />
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer"
                />
              </div>

              <select
                value={lineWidth}
                onChange={(e) => setLineWidth(parseInt(e.target.value))}
                className="bg-blue-900/40 text-white rounded px-2 py-1"
              >
                <option value="2">Thin</option>
                <option value="5">Medium</option>
                <option value="10">Thick</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={clearCanvas}
                className="p-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
                title="Clear canvas"
              >
                <Trash2 size={20} className="text-white" />
              </button>
              
              <button
                onClick={saveCanvas}
                className="p-2 bg-green-600 rounded hover:bg-green-700 transition-colors"
                title="Save as PNG"
              >
                <Download size={20} className="text-white" />
              </button>
              
              <label className="p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors cursor-pointer">
                <Upload size={20} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={importImage}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            className="w-full h-[600px] bg-white rounded-lg cursor-crosshair"
          />
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;