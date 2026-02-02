import React, { useEffect, useRef } from "react";

function ResultContainer({ score, setGetData, mode, onBack }) {
  const API_URL = "https://cold-sea-e845.pradeepmojo1708.workers.dev";
  const audioRef = useRef(null);

  useEffect(() => {
    if (score !== undefined && score !== null && !isNaN(score)) {
      fetch(`${API_URL}/up`, { method: "GET" }).catch((err) =>
        console.error("Failed to increment count:", err),
      );

      // Play audio if SGPA is less than 7.5
      if (score < 7.5) {
        const audio = new Audio("/SKCET-CGPA/low-sgpa.mp3");
        audio.volume = 0.1;
        // audio.loop = true;
        audio.play().catch((err) => console.error("Audio play failed:", err));
        audioRef.current = audio;
      }
    }
  }, [score]);

  const handleBack = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onBack();
  };

  if (score === undefined || score === null || isNaN(score)) {
    return (
      <div className="container rcon">
        <h2>Please fill all the fields</h2>
        <button className="back" type="button" onClick={handleBack}>
          Back
        </button>
      </div>
    );
  } else {
    return (
      <div className="container rcon">
        <h2>Your tentative SGPA is:</h2>
        <h3>{score}</h3>
        <br />
        <br />
        <small id="disclaimer">
          Disclaimer: This does not represent your final SGPA or CGPA.
        </small>
        <button className="back" type="button" onClick={handleBack}>
          Back
        </button>
      </div>
    );
  }
}

export default ResultContainer;
