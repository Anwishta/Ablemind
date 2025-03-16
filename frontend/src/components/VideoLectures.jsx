import React, { useState } from "react";

const videoList = [
  { 
    src: "/p_vdo1.mp4", 
    subtitles: "/p_srt1.vtt",  
    title: "Video 1" 
  },
];

const VideoLectures = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleVideos = showAll ? videoList : videoList.slice(0, 4);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Watch the Lectures</h2>

      {videoList.length === 0 ? (
        <p className="text-gray-500">No videos available at the moment.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {visibleVideos.map((video, index) => (
            <div key={index} className="flex-shrink-0 w-80">
              <h3 className="text-lg font-medium text-gray-700 mb-2">{video.title}</h3>
              <video
                controls
                className="w-full rounded-lg shadow-lg"
                preload="metadata"
                crossOrigin="anonymous"
              >
                <source src={video.src} type="video/mp4" />
                <track
                  src={video.subtitles} 
                  kind="subtitles" 
                  srclang="en" 
                  label="English" 
                  default
                />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      )}

      {videoList.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default VideoLectures;
