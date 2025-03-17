import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { SketchPicker } from "react-color";

const socket = io("http://localhost:8000");

const Whiteboard = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [color, setColor] = useState("black");
  const [size, setSize] = useState(3);
  const [eraserSize, setEraserSize] = useState(10);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [prevPos, setPrevPos] = useState({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.parentElement.clientWidth; // Make it take full width of container
    canvas.height = window.innerHeight;
    ctxRef.current = canvas.getContext("2d");

    socket.on("draw", ({ x, y, prevX, prevY, color, size }) => {
      const ctx = ctxRef.current;
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(x, y);
      ctx.stroke();
    });

    socket.on("erase", ({ x, y, size }) => {
      const ctx = ctxRef.current;
      ctx.clearRect(x - size / 2, y - size / 2, size, size);
    });

    socket.on("clear-whiteboard", () => {
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Resize canvas when window resizes
    const handleResize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    setPrevPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    const ctx = ctxRef.current;

    if (isErasing) {
      socket.emit("erase", { x, y, size: eraserSize });
      ctx.clearRect(
        x - eraserSize / 2,
        y - eraserSize / 2,
        eraserSize,
        eraserSize
      );
    } else {
      socket.emit("draw", {
        x,
        y,
        prevX: prevPos.x,
        prevY: prevPos.y,
        color,
        size,
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(prevPos.x, prevPos.y);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    setPrevPos({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setPrevPos({ x: null, y: null });
  };

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  const clearWhiteboard = () => {
    socket.emit("clear-whiteboard");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden", // Prevents horizontal scrollbar
      }}
    >
      {/* Canvas Container (Takes Remaining Space) */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          style={{
            border: "1px solid black",
            borderBottom: "2px solid black", // ✅ Added bottom border
            cursor: "crosshair",
            width: "100%",
          }}
        />
      </div>

      {/* Sidebar (Fixed 20% Width) */}
      <div
        style={{
          width: "20%",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          borderLeft: "2px solid #ccc",
          background: "#f8f9fa",
          minWidth: "250px", // Prevents sidebar from being too narrow
        }}
      >
        <SketchPicker
          color={color}
          onChange={(updatedColor) => setColor(updatedColor.hex)}
          disabled={isErasing}
        />
        <div>
          <label>Brush Size:</label>
          <input
            type="range"
            min="1"
            max="10"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            disabled={isErasing}
          />
        </div>
        <button
          onClick={toggleEraser}
          style={{ background: isErasing ? "red" : "white" }}
        >
          {isErasing ? "Eraser ON" : "Eraser OFF"}
        </button>
        <div>
          <label>Eraser Size:</label>
          <input
            type="range"
            min="5"
            max="50"
            value={eraserSize}
            onChange={(e) => setEraserSize(e.target.value)}
            disabled={!isErasing}
          />
        </div>
        <button onClick={clearWhiteboard} style={{ background: "#ffcccb" }}>
          Clear Whiteboard
        </button>
      </div>
    </div>
  );
};

export default Whiteboard;
