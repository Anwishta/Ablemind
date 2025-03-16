import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Left Side - Text Content */}
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141] text-center sm:text-left px-6">
          {/* Heading Section */}
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">E-LEARNING PLATFORM</p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">Latest Courses</h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">START NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/whiteboard")}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Go to Whiteboard
            </button>
            <button
              onClick={() => navigate("/resume-builder")}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
            >
              Build Resume
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <div className="w-full sm:w-1/2">
        <img
          className="w-full h-full object-cover shadow-md dark:shadow-gray-800 transition-all duration-300"
          src={assets?.hero_img || "https://via.placeholder.com/600"} // Fallback image
          alt="Hero Banner"
        />
      </div>
    </div>
  );
};

export default Hero;
