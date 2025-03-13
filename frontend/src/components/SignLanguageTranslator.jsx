import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";

const SignLanguageTranslator = () => {
    const webcamRef = useRef(null);
    const [translatedText, setTranslatedText] = useState("");

    useEffect(() => {
        const runHandPose = async () => {
            const net = await handpose.load();
            setInterval(() => detect(net), 100);
        };

        const detect = async (net) => {
            if (webcamRef.current && webcamRef.current.video.readyState === 4) {
                const video = webcamRef.current.video;
                const hand = await net.estimateHands(video);
                
                if (hand.length > 0) {
                    const landmarks = hand[0].landmarks;
                    sendToBackend(landmarks);
                }
            }
        };

        runHandPose();
    }, []);

    const sendToBackend = async (handData) => {
        try {
            const response = await fetch("http://localhost:5000/translate-sign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ signData: handData }),
            });

            const data = await response.json();
            setTranslatedText(data.translatedText);
        } catch (error) {
            console.error("Translation error:", error);
        }
    };

    return (
        <div>
            <h2>AI-Powered Sign Language Translator</h2>
            <Webcam ref={webcamRef} style={{ width: 640, height: 480 }} />
            {translatedText && <h3>Translation: {translatedText}</h3>}
        </div>
    );
};

export default SignLanguageTranslator;
