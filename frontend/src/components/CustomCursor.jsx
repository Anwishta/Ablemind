import React, { useEffect, useState } from "react";

const CustomCursor = ({ isCursorEnabled }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoveredWord, setHoveredWord] = useState(null);
  const synth = window.speechSynthesis;
  let animationFrameId = null;

  useEffect(() => {
    if (!isCursorEnabled) {
      document.body.style.cursor = "auto"; 
      synth.cancel();
      return;
    }

    const handleMouseMove = (e) => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });

        // Get the element under the cursor
        const hoveredElement = document.elementFromPoint(e.clientX, e.clientY);
        let textToRead = "";

        if (hoveredElement) {
          if (hoveredElement.tagName === "IMG" && hoveredElement.alt) {
            textToRead = hoveredElement.alt; // Read image alt text
          } else if (hoveredElement.textContent.trim()) {
            const range = getRangeFromPoint(e.clientX, e.clientY);
            if (range) {
              textToRead = getHoveredWord(hoveredElement.textContent.trim(), range.startOffset);
            }
          }
        }

        if (textToRead && textToRead !== hoveredWord) {
          setHoveredWord(textToRead);
          setTimeout(() => speakWord(textToRead), 200); // Delay speech to prevent stuttering
        } else if (!textToRead) {
          setHoveredWord(null);
          synth.cancel();
        }
      });
    };

    const handleMouseLeave = () => {
      setHoveredWord(null);
      synth.cancel();
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.body.style.cursor = "none"; // Hide default cursor

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.style.cursor = "auto"; // Restore default cursor
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [hoveredWord, isCursorEnabled]);

  // Fallback for caretRangeFromPoint
  const getRangeFromPoint = (x, y) => {
    if (document.caretRangeFromPoint) {
      return document.caretRangeFromPoint(x, y);
    } else if (document.caretPositionFromPoint) {
      const pos = document.caretPositionFromPoint(x, y);
      const range = document.createRange();
      range.setStart(pos.offsetNode, pos.offset);
      range.setEnd(pos.offsetNode, pos.offset);
      return range;
    }
    return null;
  };

  // Improved word detection using regex
  const getHoveredWord = (text, offset) => {
    if (!text) return null;
    const words = text.match(/\S+/g); // Extracts words ignoring multiple spaces
    if (!words) return null;

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

  if (!isCursorEnabled) return null; // Don't render cursor when disabled

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
