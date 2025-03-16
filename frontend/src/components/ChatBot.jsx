import React, { useEffect, useRef, useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { Mic, MicOff } from "lucide-react"; // Microphone Icons
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Style from "../css/chatbot.module.css";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const close = () => {
    setOpen(false);
  };

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    if (transcript && open) {
      sendVoiceInputToChatbot(transcript);
    }
  }, [transcript]);

  const sendVoiceInputToChatbot = (message) => {
    const chatbotIframe = document.getElementById("chatbot-frame");
    if (chatbotIframe) {
      chatbotIframe.contentWindow.postMessage({ text: message }, "*");
    }
  };

  return (
    <>
      <div className={Style.chatBot} ref={menuRef}>
        <div className={Style.chatWrapper} onClick={toggle}>
          <IoChatbubbleEllipses className={Style.icon} />
        </div>

        <div className={`${Style.dropDownMenu} ${open ? Style.active : Style.inactive}`}>
          <iframe
            id="chatbot-frame"
            src="https://www.chatbase.co/chatbot-iframe/WzDJGcn9FpPft4eZd9z_t"
            title="Chatbot"
            width="100%"
            className={Style.frame}
            frameBorder="0"
          ></iframe>

          <button
            onClick={() => listening ? SpeechRecognition.stopListening() : SpeechRecognition.startListening({ continuous: true })}
            className={`absolute bottom-12 right-12 w-10 h-10 rounded-full flex items-center justify-center 
              transition-all duration-300 shadow-md hover:shadow-lg
            `}
          >
            {listening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>

          <p className="text-sm bg-gray-100 text-gray-800 p-2 rounded-md shadow-md w-full text-center mt-2">
            <strong>Voice Input:</strong> {transcript || "Click Mic & Speak..."}
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatBot;