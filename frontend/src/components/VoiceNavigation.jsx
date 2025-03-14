import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

const VoiceNavigation = () => {
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

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

  useEffect(() => {
    if (transcript) {
      handleNavigation(transcript.toLowerCase());
    }
  }, [transcript]);

  const handleNavigation = (command) => {
    const match = command.match(/(?:open|go to) (.+)/);
    if (match) {
      const page = match[1].trim(); 
      if (routes[page]) {
        navigate(routes[page]);
        resetTranscript();
      }
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
      <h2 className="text-lg font-semibold">Voice Navigation</h2>
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
    </div>
  );
};

export default VoiceNavigation;
