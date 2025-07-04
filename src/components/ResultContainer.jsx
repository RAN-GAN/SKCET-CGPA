import React from "react";

function ResultContainer({ score, setGetData, mode, onBack }) {
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
