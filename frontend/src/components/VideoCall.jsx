import React, { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const VideoCall = ({ roomID }) => {
  const [meetingStarted, setMeetingStarted] = useState(false);
  
  const myMeeting = async (element) => {
    const appID = 191812151; 
    const serverSecret = "052196caf008cc30c7889d13be8f189bb423e469d335956349d699dcb5eab9a9"; 
    const userID = `user_${Math.floor(Math.random() * 1000)}`;
    
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      userID,
      "User"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `${window.location.origin}/videocall/${roomID}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
    });
    setMeetingStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4 ">
      {!meetingStarted ? (
        <button
          onClick={() => myMeeting(document.getElementById("video-container"))}
          className="px-6 py-3 bg-black text-white rounded-full shadow-md hover:bg-blue-700"
        >
          📹 Start Video Call
        </button>
      ) : (
        <div id="video-container" className="w-full h-full"></div>
      )}
    </div>
  );
};

export default VideoCall;
