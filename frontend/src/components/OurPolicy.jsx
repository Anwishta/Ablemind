import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-12 mb-16">
      {/* Title Section */}
      <h2 className="text-center text-3xl font-bold mb-12 text-gray-900 dark:text-white">
        WHY CHOOSE <span style={{ color: '#0740A7' }}>ABLE MIND?</span>
      </h2>

      {/* Policy Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
        {[
          {
            icon: assets.quality_icon,
            title: "Inclusive Learning",
            description: "Designed for all abilities, ensuring barrier-free education."
          },
          {
            icon: assets.exchange_icon,
            title: "Learn Anytime, Anywhere",
            description: "Access courses 24/7 on any device at your convenience."
          },
          {
            icon: assets.support_img,
            title: "Expert Support",
            description: "Dedicated mentors & round-the-clock assistance for your learning needs."
          }
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg transition-all 
            transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl"
          >
            <img src={item.icon} className="w-14 mx-auto mb-4" alt={item.title} />
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
