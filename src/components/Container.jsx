import React, { useState } from "react";
import ResultContainer from "./ResultContainer";

function Container({ dept, setContainerVisible }) {
  const subjects = {
    "MTech CSE": {
      "Integral Calculus and Complex Variable": 4,
      "Python Programming": 3,
      "Basics of Electrical and Electronic Engineering": 3,
      "Digital Principal and System Design": 4,
      "Tamils and Technology": 1,
      "Data Structures and Algorithm": 3,
    },
  };
  if (!subjects.hasOwnProperty(dept)) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "start",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            padding: "10px",
          }}
        >
          This department will be added soon!!
        </h1>
        <button type="button" onClick={() => setContainerVisible(false)}>
          Back
        </button>
      </div>
    );
  }

  const departmentSubjects = subjects[dept];
  const [getData, setGetData] = useState(true);
  const [cgpa, setCgpa] = useState(0);

  const handleCalculate = () => {
    let totalGradePoints = 0;
    let totalCredit = 0;
    for (let i = 1; i <= 6; i++) {
      const selectedValue = document.querySelector(`#grade${i}`).value;
      const credit = parseInt(
        subjects[dept][Object.keys(subjects[dept])[i - 1]]
      );
      if (!isNaN(credit) && selectedValue !== "") {
        totalGradePoints += parseInt(selectedValue) * credit;
        totalCredit += credit;
      }
    }
    if (totalCredit === 0) {
      console.error("Total credit is zero, cannot calculate CGPA.");
      return;
    }

    setCgpa(Math.round((totalGradePoints / totalCredit) * 100) / 100);
    setGetData(false);
  };

  if (getData) {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>{dept} 2nd semester</h1>
        <h2>SGPA Calculator</h2>
        <form id="sgpaForm">
          {Object.keys(departmentSubjects).map((subject, index) => (
            <div key={subject}>
              <label htmlFor={`grade${index + 1}`}>{subject}</label>
              <br />
              <select id={`grade${index + 1}`} name={`grade${index + 1}`}>
                <option value="\0">-select-</option>
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
          <button type="button" onClick={handleCalculate}>
            Calculate
          </button>
          <button type="button" onClick={() => setContainerVisible(false)}>
            Back
          </button>
        </form>
      </div>
    );
  } else {
    return <ResultContainer score={cgpa} setGetData={setGetData} />;
  }
}

export default Container;
