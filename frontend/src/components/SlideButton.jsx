import React, { useState } from "react";

const SlideButton = ({ onToggle }) => {
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);

  const handleToggle = () => {
    setIsTtsEnabled(!isTtsEnabled);
    onToggle(!isTtsEnabled);
  };

  return (
    <div
      className={`w-16 h-8 flex items-center px-1 rounded-full cursor-pointer transition-all duration-300 ${isTtsEnabled ? "bg-gray-800" : "bg-gray-300"}`}
      onClick={handleToggle}
    >
      <div className={`w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center transition-transform duration-300 ${isTtsEnabled ? "translate-x-8" : "translate-x-0"}`}>
        {isTtsEnabled ? <span className="text-black font-bold">C</span> : null}
      </div>
    </div>
  );
};

export default SlideButton;
