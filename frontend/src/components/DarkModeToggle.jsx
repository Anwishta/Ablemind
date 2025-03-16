import React, { useState } from "react";
import { BsSun, BsMoon } from "react-icons/bs"; // Import Sun & Moon icons

const DarkModeToggle = ({ onToggle }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (onToggle) {
      onToggle(newMode); // Pass the new mode to parent
    }
  };

  return (
    <div
      className={`w-16 h-8 flex items-center px-1 rounded-full cursor-pointer transition-all duration-300 ${
        isDarkMode ? "bg-gray-800" : "bg-gray-300"
      }`}
      onClick={handleToggle}
    >
      {/* Slider Button with Icon Inside */}
      <div
        className={`w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ${
          isDarkMode ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDarkMode ? (
          <BsMoon className="text-gray-800 text-lg" /> // Moon icon in Dark Mode
        ) : (
          <BsSun className="text-yellow-400 text-lg" /> // Sun icon in Light Mode
        )}
      </div>
    </div>
  );
};

export default DarkModeToggle;
