import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <div 
            className="flex flex-col sm:flex-row border border-gray-200 dark:border-gray-700 
            shadow-md rounded-lg overflow-hidden transition-transform duration-300 
            hover:scale-105 hover:shadow-lg"
        >
            {/* Hero Left Side (Text) */}
            <div 
                className="w-full sm:w-1/2 flex items-center justify-center p-10 
                bg-white dark:bg-gray-900 transition-all duration-300 
                animate-fade-left"
            >
                <div className="text-[#414141] dark:text-gray-200 space-y-4 max-w-md">
                    <div className="flex items-center gap-2">
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141] dark:bg-gray-400"></p>
                        <p className="font-medium text-sm md:text-base">E-LEARNING PLATFORM</p>
                    </div>
                    <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
                        Latest Courses
                    </h1>
                    <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm md:text-base">START NOW</p>
                        <p className="w-8 md:w-11 h-[2px] bg-[#414141] dark:bg-gray-400"></p>
                    </div>

                    {/* ✅ Navigation Buttons (From main branch) */}
                    <div className="mt-4 flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => navigate("/whiteboard")}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full 
                            shadow-md hover:bg-blue-700 transition duration-300"
                        >
                            Go to Whiteboard
                        </button>
                        <button
                            onClick={() => navigate("/resume-builder")}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-full 
                            shadow-md hover:bg-blue-700 transition duration-300"
                        >
                            Build Resume
                        </button>
                    </div>
                </div>
            </div>

            {/* Hero Right Side (Image) */}
            <div className="w-full sm:w-1/2 overflow-hidden animate-fade-right">
                <img
                    className="w-full h-full object-cover shadow-md dark:shadow-gray-800 
                    transition-transform duration-500 hover:scale-105"
                    src={assets?.hero_img || "https://via.placeholder.com/600"} // Fallback image
                    alt="Hero"
                />
            </div>
        </div>
    );
};

export default Hero;

