import React, { useState } from "react";

const SlideButton = ({ onToggle }) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div
      className={`w-16 h-8 flex items-center px-1 rounded-full cursor-pointer transition-all duration-300 ${
        isEnabled ? "bg-green-500" : "bg-gray-300"
      }`}
      onClick={handleToggle} // 🔹 Click to toggle instantly
    >
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
          isEnabled ? "translate-x-8" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default SlideButton;
