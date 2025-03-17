import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import socket from "./socket.js";

import Cart from "./pages/Cart";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify";
import VoiceNavigation from "./components/VoiceNavigation";
import ChatBot from "./components/ChatBot";
import CustomCursor from "./components/CustomCursor"; 
import Canvas from "./Utils/Canvas"; 
import VideoCall from "./components/VideoCall";
import CourseDetails from "./pages/CourseDetails.jsx";
import Whiteboard from "./pages/WhiteBoard.jsx";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";
import Profile from "./pages/Profile.jsx";

const App = () => {
  const [isTtsCursor, setIsTtsCursor] = useState(false); 
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = (newMode) => {
    setIsDark(newMode);
    document.body.classList.toggle("dark", newMode);
  };

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ${isDark ? "bg-black text-white" : "bg-white text-black"}`}>
      
      <ToastContainer />
      <Navbar toggleCursor={setIsTtsCursor} toggleTheme={toggleTheme} />

      {!isTtsCursor && <Canvas />}
      {isTtsCursor && <CustomCursor isCursorEnabled={isTtsCursor} />}

      <SearchBar />
      <VoiceNavigation />

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/course-details/:productId" element={<CourseDetails />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/videocall/:roomID" element={<VideoCall />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
        <Route path="/resume-builder" element={<ResumeBuilder />} />
        <Route path="/profile" element={<Profile />} />

      </Routes>

      <ChatBot />

      <Footer />
    </div>
  );
};

export default App;
