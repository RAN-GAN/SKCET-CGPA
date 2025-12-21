import React, { useState } from "react";
import ResultContainer from "./ResultContainer";

function Calculate({ setContainerVisible }) {
  const [noOfSubjects, setNoOfSubjects] = useState(0);
  const [getData, setGetData] = useState("noOfSubjects");
  const [cgpa, setCgpa] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const subjectsValue = parseInt(
      document.getElementById("subjects").value,
      10
    );
    if (isNaN(subjectsValue) || subjectsValue < 1) {
      setError("Please enter a valid number of subjects greater than 0.");
      return;
    }
    setError("");
    setNoOfSubjects(subjectsValue);
    setGetData("creditEntry");
  };

  const handleCalculate = () => {
    let totalGradePoints = 0;
    let totalCredit = 0;
    for (let i = 1; i <= noOfSubjects; i++) {
      const selectedValue = document.querySelector(`#grade${i}`).value;
      const credit = parseInt(document.querySelector(`#credit${i}`).value, 10);
      if (selectedValue !== "" && !isNaN(credit) && credit > 0) {
        totalGradePoints += parseInt(selectedValue) * credit;
        totalCredit += credit;
      }
    }
    if (totalCredit === 0) {
      console.error("Total credit is zero, cannot calculate CGPA.");
      return;
    }
    setCgpa(Math.round((totalGradePoints / totalCredit) * 100) / 100);
    setGetData("result");
  };

  const handleBack = () => {
    setGetData("noOfSubjects");
  };

  if (getData === "noOfSubjects") {
    return (
      <div className="container">
        <h2>SGPA Calculator</h2>
        <form id="sgpaForm">
          <label htmlFor="subjects">Number of Subjects: </label>
          <br />
          <input required type="number" id="subjects" name="subjects" min="1" />
          {error && (
            <p
              style={{
                color: "white",
                backgroundColor: "red",
                border: "1px solid darkred",
                borderRadius: "5px",
                padding: "10px",
                margin: "10px 0",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}
          <button type="button" onClick={() => setContainerVisible(false)}>
            Back
          </button>
          <button type="button" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  } else if (getData === "creditEntry") {
    return (
      <div className="container">
        <h2>SGPA Calculator</h2>
        <form id="sgpaForm">
          {Array.from({ length: noOfSubjects }, (_, index) => (
            <div key={index}>
              <label htmlFor={`credit${index + 1}`}>
                Credit of Subject {index + 1}
              </label>
              <br />
              <input
                required
                type="number"
                id={`credit${index + 1}`}
                name={`credit${index + 1}`}
                min="1"
              />
              <label htmlFor={`grade${index + 1}`}>
                Grade Obtained in Subject {index + 1}
              </label>
              <br />
              <select id={`grade${index + 1}`} name={`grade${index + 1}`}>
                <option value="">-select-</option>
                <option value="10">O</option>
                <option value="9">A+</option>
                <option value="8">A</option>
                <option value="7">B+</option>
                <option value="6">B</option>
                <option value="5">C</option>
                <option value="0">U</option>
              </select>
            </div>
          ))}
          <button type="button" onClick={handleBack}>
            Back
          </button>
          <button type="button" onClick={handleCalculate}>
            Calculate
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <ResultContainer
        score={cgpa}
        setGetData={setGetData}
        mode="yourself"
        onBack={handleBack}
      />
    );
  }
}

export default Calculate;
