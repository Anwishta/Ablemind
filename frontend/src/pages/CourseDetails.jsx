import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { Mic, MicOff } from "lucide-react";
import Coin from "../components/Coin";

const CourseDetails = () => {
  const { productId } = useParams();
  const { products, darkMode } = useContext(ShopContext); // Get dark mode state
  const [course, setCourse] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCoinModal, setShowCoinModal] = useState(false);
  const speechRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (products && products.length > 0) {
      const selectedCourse = products.find((item) => item._id === productId);
      if (selectedCourse) {
        setCourse(selectedCourse);
      }
    }
  }, [productId, products]);

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const { top, height } = textRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const scrollProgress = Math.min(100, ((windowHeight - top) / height) * 100);
        setProgress(scrollProgress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setShowCoinModal(true), 1000);
    }
  }, [progress]);

  if (!course) {
    return <div className="text-center mt-10 text-black dark:text-gray-200">Loading Course Details...</div>;
  }

  const handleSpeech = () => {
    if (!("speechSynthesis" in window)) {
      alert("Your browser does not support text-to-speech.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      if (!speechRef.current) {
        speechRef.current = new SpeechSynthesisUtterance(course.description);
        speechRef.current.rate = 1.0;

        speechRef.current.onboundary = (event) => {
          const spokenPercentage = (event.charIndex / course.description.length) * 100;
          setProgress(spokenPercentage);
        };

        speechRef.current.onend = () => {
          setIsSpeaking(false);
          setProgress(100);
        };
      }

      window.speechSynthesis.speak(speechRef.current);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 relative bg-white dark:bg-gray-800">
      {/* Progress Circle */}
      <div className="fixed top-6 left-6 w-16 h-16">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" strokeWidth="5" stroke="#E5E7EB" fill="transparent" />
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth="5"
            stroke={darkMode ? "#38bdf8" : "blue"}
            fill="transparent"
            strokeDasharray="283"
            strokeDashoffset={(1 - progress / 100) * 283}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <text x="50" y="55" textAnchor="middle" fontSize="14" fill={darkMode ? "white" : "black"}>
            {Math.round(progress)}%
          </text>
        </svg>
      </div>

      {/* Course Details */}
      <div className="flex flex-col items-center text-black dark:text-gray-200">
        <h1 className="font-medium text-3xl">{course.name}</h1>
        <p className="mt-3 text-xl text-gray-500 dark:text-gray-400">{course.category}</p>

        {/* Course Description */}
        <div
          className="mt-6 flex flex-col items-center gap-4 p-4 w-4/5 rounded-lg shadow-sm bg-gray-100 dark:bg-gray-800"
          ref={textRef}
        >
          <p className="text-lg">{course.description}</p>
          <button
            onClick={handleSpeech}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition flex items-center justify-center"
          >
            {isSpeaking ? <Mic size={24} /> : <MicOff size={24} />}
          </button>
        </div>
      </div>

      {/* Coin Modal */}
      {showCoinModal && <Coin onClose={() => setShowCoinModal(false)} />}
    </div>
  );
};

export default CourseDetails;
