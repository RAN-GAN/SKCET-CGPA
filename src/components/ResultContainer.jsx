import React, { useEffect } from "react";

function ResultContainer({ score, setGetData, mode, onBack }) {
  const API_URL = "https://cold-sea-e845.pradeepmojo1708.workers.dev";

  useEffect(() => {
    if (score !== undefined && score !== null && !isNaN(score)) {
      fetch(`${API_URL}/up`, { method: "GET" }).catch((err) =>
        console.error("Failed to increment count:", err)
      );
    }
  }, [score]);

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
        <button className="back" type="button" onClick={onBack}>
          Back
        </button>
      </div>
    );
  }
}

export default ResultContainer;
