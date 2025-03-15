import React, { useState, useEffect } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline, IoRefresh } from "react-icons/io5";

const FontSizeAdjuster = () => {
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
    //   localStorage.setItem("fontSize", size); // Save preference
    }
  };

  return (
    <div className="flex gap-2">
      <button onClick={() => changeFontSize(fontSize + 2)} className="btn">
        <IoAddCircleOutline /> 
      </button>
      <button onClick={() => changeFontSize(fontSize - 2)} className="btn">
        <IoRemoveCircleOutline /> 
      </button>
      <button onClick={() => changeFontSize(16)} className="btn">
        <IoRefresh /> 
      </button>
    </div>
  );
};

export default FontSizeAdjuster;
