import React, { useState, useEffect } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline, IoRefresh } from "react-icons/io5";

const FontSizeAdjuster = ({ isDarkMode }) => {
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const storedFontSize = localStorage.getItem("fontSize");
    if (storedFontSize) {
      setFontSize(parseInt(storedFontSize, 10));
      document.documentElement.style.setProperty("--global-font-size", `${storedFontSize}px`);
    }
  }, []);

  const changeFontSize = (size) => {
    if (size >= 12 && size <= 24) {
      setFontSize(size);
      document.documentElement.style.setProperty("--global-font-size", `${size}px`);
      // localStorage.setItem("fontSize", size); // Save preference if needed
    }
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => changeFontSize(fontSize + 2)} className="btn">
        <IoAddCircleOutline className={isDarkMode ? "text-white" : "text-black"} />
      </button>
      <button onClick={() => changeFontSize(fontSize - 2)} className="btn">
        <IoRemoveCircleOutline className={isDarkMode ? "text-white" : "text-black"} />
      </button>
      <button onClick={() => changeFontSize(16)} className="btn">
        <IoRefresh className={isDarkMode ? "text-white" : "text-black"} />
      </button>
    </div>
  );
};

export default FontSizeAdjuster;
