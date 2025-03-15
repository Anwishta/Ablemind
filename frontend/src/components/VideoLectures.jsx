import React, { useState } from "react";
import { assets } from "../assets/assets"; // Import video assets

const VideoLectures = () => {
  const videoList = Object.values(assets).filter((item) => item.endsWith(".mp4")); // Fetch only video files
  const [showAll, setShowAll] = useState(false);

  const visibleVideos = showAll ? videoList : videoList.slice(0, 4); // Show up to 4 videos by default

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">Watch the Lectures</h2>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {visibleVideos.map((video, index) => (
          <div key={index} className="flex-shrink-0 w-80">
            <video controls className="w-full rounded-lg shadow-lg">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>

      {/* Show More Button (Only If More Than 4 Videos Exist) */}
      {videoList.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default VideoLectures;
