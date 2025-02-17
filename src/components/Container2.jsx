import React, { useState } from "react";
import ResultContainer from "./ResultContainer";

function Container2({ dept, setContainerVisible }) {
  const subjects = {
    "MTech CSE": {
      "Discrete Structures": 4,
      "Operating systems": 3,
      "Object Oriented Analysis and Design": 3,
      "Computer Architecture": 3,
      "Design Thinking Fundamentals": 4,
      "Java Programming": 3,
      "Operataing System Lab": 1.5,
    },
    // CSE: {
    //   "Mathematics II": 4,
    //   "Applied Science ": 4,
    //   "Data Structures and Algorithms": 3,
    //   "Database Management Systems ": 3,
    //   "Java Programmming": 3,
    //   "Object Oriented Analysis and Design ": 4,
    //   "Tamils and Technology": 1,
    // },
    // CSY: {
    //   "Mathematics II": 4,
    //   "Applied Science ": 4,
    //   "Data Structures and Algorithms": 3,
    //   "Database Management Systems ": 3,
    //   "Object Oriented Programming using Java ": 3,
    //   "Operating Systems ": 4,
    //   "Tamils and Technology": 1,
    // },
    // IT: {
    //   "Mathematics II": 4,
    //   "Applied Science ": 4,
    //   "Data Structures and Algorithms": 3,
    //   "Database Management Systems ": 3,
    //   "Java Programmming": 3,
    //   "Object Oriented Analysis and Design ": 4,
    //   "Tamils and Technology": 1,
    // },
    // CSBS: {
    //   "Linear Algebra ": 4,
    //   "Business Communication and Value Science II ": 3,
    //   "Fundamentals of Economics ": 3,
    //   "Data Structures ": 3,
    //   "Tamils and Technology": 1,
    //   "Principles of Electronics Engineering": 4,
    //   "Statistical Methods and Modelling ": 4,
    // },
  };
  if (!subjects.hasOwnProperty(dept)) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
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
          <br />
          <br />
          Meanwhile try using the <b>"CALCULATE YOURSELF"</b> option.
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
        <h1 style={{ textAlign: "center" }}>{dept} subject</h1>
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
          <button type="button" onClick={() => setContainerVisible(false)}>
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
      <ResultContainer score={cgpa3} setGetData={setGetData} mode="auto" />
    );
  }
}

export default Container2;
