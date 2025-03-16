import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
    return (
        <div className="flex flex-col sm:flex-row border border-gray-200 dark:border-gray-700 shadow-md rounded-lg overflow-hidden transition-all duration-300">
            {/* Hero Left Side */}
            <div className="w-full sm:w-1/2 flex items-center justify-center p-10 bg-white dark:bg-gray-900 transition-all duration-300">
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
                </div>
            </div>

            {/* Hero Right Side */}
            <div className="w-full sm:w-1/2">
                <img
                    className="w-full h-full object-cover shadow-md dark:shadow-gray-800 transition-all duration-300"
                    src={assets.hero_img}
                    alt="Hero"
                />
            </div>
        </div>
    );
};

export default Hero;
