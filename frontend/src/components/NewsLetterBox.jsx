import React from 'react';

const NewsLetterBox = () => {
  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div 
      className="text-center border rounded-lg p-8 shadow-md bg-white dark:bg-gray-900 dark:text-white 
      transform transition-all duration-300 
      hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
    >
      <p className="text-2xl font-medium text-gray-800 dark:text-white">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Stay updated with the latest offers, exclusive deals, and educational insights. Join our community today!
      </p>

      <form 
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-lg overflow-hidden"
        onSubmit={onSubmit}
      >
        <input
          className="w-full sm:flex-1 outline-none p-2 text-gray-700 dark:text-white bg-transparent"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button 
          type="submit" 
          className="bg-black text-white text-xs px-6 py-3 hover:bg-gray-800 transition-all"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLetterBox;
