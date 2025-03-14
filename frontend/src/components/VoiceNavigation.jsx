import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";
import { products } from "../assets/assets"; 
import ProductItem from "../components/ProductItem"; 

const VoiceNavigation = () => {
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  const [awaitingResponse, setAwaitingResponse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const routes = {
    home: "/",
    about: "/about",
    cart: "/cart",
    collection: "/collection",
    contact: "/contact",
    login: "/login",
    orders: "/orders",
    "place order": "/place-order",
    verify: "/verify",
    product: "/product/1",
  };

  const courseCategories = {
    maths: "Maths",
    english: "English",
    computer: "Computer",
  };

  useEffect(() => {
    if (transcript) {
      handleCommand(transcript.toLowerCase());
    }
  }, [transcript]);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const fetchCourses = (category) => {
    setCourses([]); 
    setCurrentCategory(category);
    setCurrentIndex(0);
    speak(`Fetching ${category} courses for you...`);
    
    const filteredCourses = products.filter((course) => 
      course.category.toLowerCase() === category.toLowerCase()
    );
  
    if (filteredCourses.length > 0) {
      setCourses(filteredCourses);
      setTimeout(() => {
        speak(`I found some ${category} courses. Do you want me to read the headlines for you?`);
        setAwaitingResponse(true);
      }, 1000); 
    } else {
      speak(`Sorry, no courses found for ${category}.`);
    }
  };

  const handleCommand = (command) => {
    if (awaitingResponse) {
      if (command.includes("yes")) {
        readCourses();
        setAwaitingResponse(false);
      } else if (command.includes("no")) {
        speak("Alright, let me know if you need anything else.");
        setAwaitingResponse(false);
      }
      resetTranscript();
      return;
    }

    // Navigation commands
    const match = command.match(/(?:open|go to) (.+)/);
    if (match) {
      const page = match[1].trim();
      if (routes[page]) {
        speak(`Opening ${page}`);
        setTimeout(() => navigate(routes[page]), 1500);
        resetTranscript();
      } else {
        speak(`Sorry, I couldn't find the page ${page}`);
      }
      return;
    }

    Object.keys(courseCategories).forEach((categoryKey) => {
      if (
        command.includes(`recommend some courses for ${categoryKey}`) || 
        command.includes(`fetch some courses for ${categoryKey}`)
      ) {
        fetchCourses(courseCategories[categoryKey]);
        resetTranscript();
      }
    });

    if (command.includes("next") && courses.length > currentIndex + 5) {
      setCurrentIndex((prev) => prev + 5);
      readCourses();
    }
  };

  const readCourses = () => {
    if (courses.length > currentIndex) {
      let nextCourses = courses.slice(currentIndex, currentIndex + 5);
      let headlines = nextCourses
        .map((course, index) => `Course ${index + 1}: ${course.name}`)
        .join(". ");

      speak(`Here are some ${currentCategory} courses: ${headlines}`);
    } else {
      speak("No more courses available.");
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
      <h2 className="text-lg font-semibold">Voice-Controlled Navigation & Course Recommendation</h2>
      <p className="mt-2 text-gray-700">🎤 Listening: {listening ? "ON" : "OFF"}</p>

      <button
        onClick={() => SpeechRecognition.startListening({ continuous: true })}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Start Listening
      </button>
      <button
        onClick={SpeechRecognition.stopListening}
        className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        Stop
      </button>
      <button
        onClick={resetTranscript}
        className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded-md"
      >
        Reset
      </button>

      <p className="mt-4 p-2 border border-gray-300 rounded bg-white">
        <strong>Transcript:</strong> {transcript}
      </p>

      {courses.length > 0 && (
        <div className="mt-4 text-left">
          <h3 className="font-semibold">Recommended {currentCategory} Courses:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6"> 
            {courses.slice(currentIndex, currentIndex + 5).map((item) => (
              <ProductItem
                key={item._id} 
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceNavigation;
