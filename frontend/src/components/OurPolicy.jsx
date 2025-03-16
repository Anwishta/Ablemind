import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="py-20 px-6 md:px-12 lg:px-20 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-12">
      {/* Title Section */}
      <h2 className="text-center text-3xl font-bold mb-12 text-gray-900 dark:text-white">
  WHY CHOOSE <span style={{ color: '#0740A7' }}>ABLE MIND?</span>
</h2>


      {/* Policy Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 text-center">
        {/* Accessibility Commitment */}
        <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg transition-transform transform hover:scale-105">
          <img src={assets.quality_icon} className="w-14 mx-auto mb-4" alt="Accessibility Icon" />
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Inclusive Learning</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Designed for all abilities, ensuring **barrier-free** education.
          </p>
        </div>

        {/* Flexible Learning */}
        <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg transition-transform transform hover:scale-105">
          <img src={assets.exchange_icon} className="w-14 mx-auto mb-4" alt="Flexibility Icon" />
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Learn Anytime, Anywhere</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Access courses **24/7** on any device at your convenience.
          </p>
        </div>

        {/* Expert Support */}
        <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg transition-transform transform hover:scale-105">
          <img src={assets.support_img} className="w-14 mx-auto mb-4" alt="Support Icon" />
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Expert Support</h3>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Dedicated mentors & **round-the-clock** assistance for your learning needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
