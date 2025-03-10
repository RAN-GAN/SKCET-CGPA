import React, { useState } from "react";
import ResultContainer from "./ResultContainer";

function Container1({ dept, setContainerVisible }) {
  const subjects = {
    "MTech CSE": {
      "Linear Algebra and Differential Calculus": 4,
      "Heritage of Tamils ": 1,
      "Problem Solving using C ": 3,
      "Business English Communication ": 3,
      "Engineering Physics": 4,
      "Engineering Graphics ": 3,
    },
    CSE: {
      "Mathematics I": 4,
      "Applied Science ": 4,
      "Problem Solving using C++ ": 3,
      "Digital Logic and Design": 4,
      "Application development Practices": 3,
      "Engineering Biology ": 3,
      "Heritage of Tamils": 1,
    },
    ECE: {
      "Problem using C++": 3,
      "Circuit Theory and Electron Devices": 3,
      "Digital System Design": 3,
      "Digital System Design Laboratory": 1,
      "Oral Written and Communication Skills ": 3,
      "Application Development Practices ": 3,
      "Mathematics 1 ": 4,
      "Engineering Biology ": 3,
      "Heritage of Tamils ": 1,
    },
    MCT: {
      "Mathematics 1": 4,
      "Production Technology": 3,
      "Sensors, Measurements, and Instrumentation": 3,
      "Problem solving using C++": 3,
      "Oral and written communication skills": 3,
      "Production Technology Laboratory": 1,
      "Computer Aided Drawing Laboratory for Mechatronics": 1,
      "Heritage of Tamil": 1,
      "Application Development Practices": 3,
    },
    EEE: {
      "Oral Written and Communication Skills": 3,
      "Mathematics 1": 4,
      "Bussiness English and Communication": 4,
      "Application Development Practices": 3,
      "Problem Solving using C++": 3,
      "Bussiness English and Communication Laboratory": 1,
      "Heritage of Tamils": 1,
      "Engineering Biology": 3,
    },
    CSY: {
      "Mathematics 1": 4,
      "Application Development Practices": 3,
      "Problem Solving using C++": 3,
      "Oral and Written Communication Skills": 3,
      "Networking and Communication": 4,
      "Heritage of Tamils": 1,
      "Mandatory Course I (Induction Programme)": 0,
    },
    CIVIL: {
      "Introduction to Civil Engineering": 3,
      "Mathematics 1": 4,
      "Fundamentals of Electrical and Electronics Engineering": 3,
      "Heritage of Tamil": 1,
      "Oral and Written Communication Skills": 3,
      "Problem Solving using C++": 3,
      "Design Thinking and Workshop Practices": 2.5,
      "Engineering Graphics Laboratory": 1.5,
      "Fundamentals of Electrical and Electronics Engineering Laboratory": 1,
      "Induction Program": 0,
    },
    IT: {
      "Mathematics I": 4,
      "Applied Science ": 4,
      "Problem Solving using C++ ": 3,
      "Digital Logic and Design": 4,
      "Application development Practices": 3,
      "Engineering Biology ": 3,
      "Heritage of Tamils": 1,
    },
    MECH: {
      "Mathematics 1": 4,
      "Fundamentals of Electrical and Electronics Engineering": 3,
      "Fundamentals of Electrical and Electronics Engineering Laboratory": 1,
      "Engineering Drawing": 3,
      "Problem Solving using C++": 3,
      "Oral and Written Communication Skills": 3,
      "Heritage of Tamil": 1,
    },
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
          {/* <a
            href="https://forms.gle/dwRe6sEWJJsqUFBKA"
            target="_blank"
            style={{
              color: "rgb(33, 120, 197)",
              textDecoration: "underline",
            }}
          >
            help us by filling out this form!
          </a>*/}
          <br />
          Meanwhile try using the <b>"CALCULATE YOURSELF"</b> option.
        </h2>
        <button type="button" onClick={() => setContainerVisible(false)}>
          Back
        </button>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSecosqb3nHjCk46PvOhQBpH54mtFHpupVAzWvf8b5tIWeWxLA/viewform?embedded=true"
          width="100%"
          height="100%"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          loading="lazy"
        >
          Loading…
        </iframe>
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
        <h1 style={{ textAlign: "center" }}>{dept} subjects</h1>
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
    return <ResultContainer score={cgpa} setGetData={setGetData} mode="auto" />;
  }
}

export default Container1;
