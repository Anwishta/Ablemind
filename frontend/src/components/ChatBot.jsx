import React, { useEffect, useRef, useState } from "react";
import { IoChatbubbleEllipses } from "react-icons/io5";
import Style from "../css/chatbot.module.css";
const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const close = () => {
    setOpen(false);
  };
  const toggle = () => {
    setOpen(!open);
  };
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <div className={Style.chatBot} ref={menuRef}>
        <div className={Style.chatWrapper} onClick={toggle}>
          <IoChatbubbleEllipses className={Style.icon} />
        </div>
        <div
          className={`${Style.dropDownMenu} ${
            open ? Style.active : Style.inactive
          }`}
        >
          <iframe
          src="https://www.chatbase.co/chatbot-iframe/WzDJGcn9FpPft4eZd9z_t"
          title="Chatbot"
          width="100%"
          className={Style.frame}
          frameborder="0"
          ></iframe>

        </div>
      </div>
    </>
  );
};

export default ChatBot;