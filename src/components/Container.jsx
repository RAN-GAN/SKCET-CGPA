import React, { useState } from "react";
import ResultContainer from "./ResultContainer";

function Container({ dept, setContainerVisible }) {
  const subjects = {
    "MTech CSE": {
      "Problem Solving using C": 3,
      "Business English and Communication": 3,
      "Linear Algebra and Differential Calculus": 4,
      "Engineering Graphics": 3,
      "Engineering Physics": 4,
      "Heritage of Tamil": 1,
    },
    AIDS: {
      "PROBLEM SOLVING USING C++": 4,
      "DIGITAL LOGIC DESIGN AND COMPUTER ARCHITECTURE": 4,
      "ORAL AND WRITTEN COMMUNICATION SKILLS": 3,
      "APPLICATION DEVELOPMENT PRACTICES": 3,
      "MATHEMATICS I": 4,
      "Heritage of Tamils": 1,
    },
    CSD: {
      "PROBLEM SOLVING USING C++": 4,
      "DIGITAL LOGIC DESIGN AND COMPUTER ARCHITECTURE": 4,
      "ORAL AND WRITTEN COMMUNICATION SKILLS": 3,
      "APPLICATION DEVELOPMENT PRACTICES": 3,
      "MATHEMATICS I": 4,
      "Heritage of Tamils": 1,
    },
    CSE: {
      "Mathematics I": 4,
      "APPLICATION DEVELOPMENT PRACTICES": 3,
      "PROBLEM SOLVING USING C++": 4,
      "ORAL AND WRITTEN COMMUNICATION SKILLS": 3,
      "Digital Logistics and Design": 4,
      "Heritage of Tamils": 1,
    },
    CSY: {
      "Mathematics I": 4,
      "APPLICATION DEVELOPMENT PRACTICES": 3,
      "PROBLEM SOLVING USING C++": 4,
      "ORAL AND WRITTEN COMMUNICATION SKILLS": 3,
      "Networking and Communication": 4,
      "Heritage of Tamils": 1,
    },
    ECE: {
      "APPLIED SCIENCE": 4,
      "APPLIED SCIENCE LABORATORY": 2,
      "PROBLEM SOLVING USING C++": 3,
      "CIRCUIT THEORY AND ELECTRON DEVICES": 3,
      "APPLICATION DEVELOPMENT PRACTICES": 3,
      "MATHEMATICS I": 4,
      "ENGINEERING BIOLOGY": 3,
      "HERITAGE OF TAMILS": 1,
    },
    IT: {
      "PROBLEM SOLVING USING C++": 4,
      "DIGITAL LOGIC DESIGN AND COMPUTER ARCHITECTURE": 4,
      "ORAL AND WRITTEN COMMUNICATION SKILLS": 3,
      "APPLICATION DEVELOPMENT PRACTICES": 3,
      "MATHEMATICS I": 4,
      "Heritage of Tamils": 1,
    },
    CSBS: {
      "Problem Solving using C": 4.5,
      "Discrete Mathematics for Computer Science": 4,
      "probability and Statistics": 4,
      "Heritage of Tamils": 1,
      "Principles of Electrical Engineering": 4,
      "Physics for Computing Science": 4,
      "Business Communication and Value Science I": 3,
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
        <h2
          style={{
            textAlign: "center",
            padding: "10px",
          }}
        >
          We are currently working on adding more departments and subjects.
          <br />
          <a
            href="https://forms.gle/dwRe6sEWJJsqUFBKA"
            target="_blank"
            style={{
              color: "rgb(33, 120, 197)",
              textDecoration: "underline",
            }}
          >
            help us by filling out this form!
          </a>
        </h2>
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
    for (let i = 1; i <= Object.keys(subjects[dept]).length; i++) {
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
        <h1 style={{ textAlign: "center" }}>{dept} 1'st semester</h1>
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
