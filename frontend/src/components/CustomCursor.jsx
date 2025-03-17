import React, { useEffect, useState } from "react";

const CustomCursor = ({ isCursorEnabled }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoveredText, setHoveredText] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const synth = window.speechSynthesis;
  let animationFrameId = null;

  useEffect(() => {
    if (!isCursorEnabled) {
      document.body.style.cursor = "auto";
      synth.cancel();
      return;
    }

    // Check dark mode on mount and changes
    const updateDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    updateDarkMode();

    const handleMouseMove = (e) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });

        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        let textToRead = "";

        if (hoveredElement) {
          if (hoveredElement.tagName === "IMG" && hoveredElement.alt) {
            textToRead = hoveredElement.alt; // Read image alt text
          } else if (hoveredElement.tagName === "P" || hoveredElement.tagName === "DIV") {
            textToRead = hoveredElement.textContent.trim(); // Read full paragraph or div content
          }
        }

        if (textToRead && textToRead !== hoveredText) {
          setHoveredText(textToRead);
          setTimeout(() => speakText(textToRead), 200);
        } else if (!textToRead) {
          setHoveredText(null);
          synth.cancel();
        }
      });
    };

    const handleMouseLeave = () => {
      setHoveredText(null);
      synth.cancel();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.body.style.cursor = "none";

    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "auto";
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [hoveredText, isCursorEnabled]);

  const speakText = (text) => {
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  if (!isCursorEnabled) return null;

  return (
    <div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none transition-transform duration-200 ease-out scale-125"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        backgroundColor: isDarkMode ? "white" : "black",
      }}
    ></div>
  );
};

export default CustomCursor;
