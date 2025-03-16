import React, { useEffect } from "react";

const Coin = ({ onClose }) => {
  
  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support text-to-speech.");
      return;
    }

    const speech = new SpeechSynthesisUtterance("Congratulations! You won one coin for completing the lecture.");
    speech.rate = 1.0; 
    speech.pitch = 1.2; 
    speech.volume = 1; 
    window.speechSynthesis.speak(speech);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center">
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZmJib3dzbWR3cTVvNnplN3U4MzZwdzVoMXVtcml6MTd4Mnc2ZWdjNyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/UrnxRwhcNwlIL2c0Pd/giphy.gif"
          alt="Coin"
          className="w-24 h-24 animate-bounce"
        />
        <h2 className="text-xl font-bold mt-4 text-green-600">🎉 Congratulations! 🎉</h2>
        <p className="text-lg mt-2 text-gray-700">
          You've earned <strong className="text-yellow-500">1 coin</strong> for completing the lecture!
        </p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-violet-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Awesome! 🎊
        </button>
      </div>
    </div>
  );
};

export default Coin;
