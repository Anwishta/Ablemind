import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";
import { products } from "../assets/assets"; 
import ProductItem from "../components/ProductItem"; 
import { Mic, MicOff } from "lucide-react"; 

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
    <div className="relative">
      <div className="fixed left-4 bottom-4 transform -translate-y-1/2 flex items-center space-x-3 p-3 text-white rounded-lg shadow-lg">
        <button
          onClick={() => listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening({ continuous: true })}
          className={`w-12 h-12 flex items-center justify-center rounded-full 
            transition-all duration-300 shadow-md hover:shadow-lg 
            ${listening ? "bg-red-500 text-white animate-pulse" : "bg-blue-500 text-white"}
          `}
        >
          {listening ? <MicOff size={24} /> : <Mic size={24} />}
        </button>

        <p className="text-sm bg-gray-100 text-gray-800 p-2 rounded-md shadow-md w-60">
          <strong>Transcript:</strong> {transcript || "Start speaking..."}
        </p>
      </div>

      {courses.length > 0 && (
        <div className="mt-4 p-6 bg-white shadow-lg rounded-lg">
          <h3 className="font-semibold text-lg">Recommended {currentCategory} Courses:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4"> 
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
