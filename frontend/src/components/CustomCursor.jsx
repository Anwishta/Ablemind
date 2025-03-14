import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoveredWord, setHoveredWord] = useState(null);
  const synth = window.speechSynthesis;

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Get the element under the cursor
      const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
      let textToRead = "";

      if (hoveredElement) {
        if (hoveredElement.tagName === "IMG" && hoveredElement.alt) {
          textToRead = hoveredElement.alt; // Read image alt text
        } else if (hoveredElement.textContent.trim()) {
          const range = document.caretRangeFromPoint(e.clientX, e.clientY);
          if (range) {
            textToRead = getHoveredWord(hoveredElement.textContent.trim(), range.startOffset);
          }
        }
      }

      if (textToRead && textToRead !== hoveredWord) {
        setHoveredWord(textToRead);
        speakWord(textToRead);
      }
    };

    const handleMouseLeave = () => {
      setHoveredWord(null);
      synth.cancel(); // Stop speech if cursor leaves
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.body.style.cursor = "none"; // Hide default cursor

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "auto"; // Restore default cursor
    };
  }, [hoveredWord]);

  // Extract the exact word under the cursor
  const getHoveredWord = (text, offset) => {
    if (!text) return null;
    const words = text.split(/\s+/);
    let charCount = 0;

    for (let word of words) {
      charCount += word.length + 1; // +1 for space
      if (charCount > offset) return word;
    }

    return null;
  };

  const speakWord = (word) => {
    if (synth.speaking) synth.cancel(); 
    const utterance = new SpeechSynthesisUtterance(word);
    synth.speak(utterance);
  };

  return (
    <div
      className="fixed top-0 left-0 w-6 h-6 bg-[#000000] rounded-full pointer-events-none transition-transform duration-200 ease-out scale-125"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    ></div>
  );
};

export default CustomCursor;
