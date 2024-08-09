import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function VideoPlayer({ videos }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set the video URL based on the current index
  const videoUrl = videos?.[currentIndex]?.video_url;

  const handleNextVideoButton = () => {
    if (currentIndex < videos?.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePreviousButton = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      {/* Video Player */}
      <div className="video-container">
        {videoUrl && (
          <iframe
            className="w-full h-[400px]"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-end items-center gap-2">
        <button
          onClick={handlePreviousButton}
          className={`flex justify-center items-center gap-3 w-44 rounded-md border border-blue-500 py-2 text-blue-500 ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentIndex === 0}
        >
          <FaArrowLeft /> Previous
        </button>
        <button
          onClick={handleNextVideoButton}
          className={`flex justify-center items-center gap-3 w-44 rounded-md border border-blue-500 py-2 text-blue-500 ${currentIndex === videos?.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={currentIndex === videos?.length - 1}
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
}

export default VideoPlayer;
