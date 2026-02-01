import React, { useState, useEffect } from "react";
import ResultContainer from "./ResultContainer";
import { subjectsByYear } from "../data/subjectsData";

function SubjectCalculator({ year, dept, setContainerVisible }) {
  const [departmentSubjects, setDepartmentSubjects] = useState(null);
  const [grades, setGrades] = useState({});
  const [view, setView] = useState("input");
  const [cgpa, setCgpa] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (
      subjectsByYear.hasOwnProperty(year) &&
      subjectsByYear[year].hasOwnProperty(dept)
    ) {
      const subjects = subjectsByYear[year][dept];
      setDepartmentSubjects(subjects);
      const initialGrades = {};
      Object.keys(subjects).forEach((subject) => {
        initialGrades[subject] = "";
      });
      setGrades(initialGrades);
      setError("");
      setView("input");
    } else {
      setDepartmentSubjects(null);
      setError(
        "We are currently working on adding more departments and subjects for this semester.",
      );
    }
  }, [year, dept]);

  if (!departmentSubjects) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2>
          {error ||
            "We are currently working on adding more departments and subjects for this semester."}
          <br />
          <br />
          Meanwhile try using the <b>"CALCULATE YOURSELF"</b> option.
        </h2>
        <button type="button" onClick={() => setContainerVisible(false)}>
          Back to Menu
        </button>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSecosqb3nHjCk46PvOhQBpH54mtFHpupVAzWvf8b5tIWeWxLA/viewform?embedded=true"
          width="100%"
          height="80%"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          loading="lazy"
          title="Department Subject Request Form"
        >
          Loading…
        </iframe>
      </div>
    );
  }

  const handleGradeChange = (subject, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [subject]: value,
    }));
    setError("");
  };

  const handleCalculateSgpa = () => {
    let totalGradePoints = 0;
    let totalCredit = 0;
    let hasSelectedAtLeastOneGrade = false;

    Object.keys(departmentSubjects).forEach((subject) => {
      const gradeValue = grades[subject];
      const credit = departmentSubjects[subject];

      if (gradeValue !== "" && gradeValue !== "\0" && !isNaN(credit)) {
        totalGradePoints += parseInt(gradeValue) * credit;
        totalCredit += credit;
        hasSelectedAtLeastOneGrade = true;
      }
    });

    if (!hasSelectedAtLeastOneGrade || totalCredit === 0) {
      setError(
        "Please select a grade for at least one subject with valid credits.",
      );
      return;
    }
    setError("");
    setCgpa(Math.round((totalGradePoints / totalCredit) * 100) / 100);
    setView("result");
  };

  const handleBackToInput = () => {
    setView("input");
  };

  if (view === "input") {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>
          {dept} - {year}
        </h1>
        <h2>SGPA Calculator</h2>
        <form
          id="sgpaFormS"
          onSubmit={(e) => {
            e.preventDefault();
            handleCalculateSgpa();
          }}
        >
          {Object.keys(departmentSubjects).map((subject, index) => (
            <div key={subject} className="subject-entry-auto">
              {" "}
              <label htmlFor={`grade-${subject.replace(/\s+/g, "-")}`}>
                {subject}
              </label>
              <br />
              <select
                className="creditInput"
                id={`grade-${subject.replace(/\s+/g, "-")}`}
                name={`grade-${subject.replace(/\s+/g, "-")}`}
                value={grades[subject]}
                onChange={(e) => handleGradeChange(subject, e.target.value)}
              >
                <option value="">-Select Grade-</option>
                {year === "1st Year" ? (
                  <>
                    <option value="10">S</option>
                    <option value="9">A+</option>
                    <option value="8">A</option>
                    <option value="7">B+</option>
                    <option value="6.5">B</option>
                    <option value="6">C+</option>
                    <option value="5">C</option>
                    <option value="0">U (RA)</option>
                    <option value="0">SA</option>
                    <option value="0">WC</option>
                  </>
                ) : (
                  <>
                    <option value="10">O</option>
                    <option value="9">A+</option>
                    <option value="8">A</option>
                    <option value="7">B+</option>
                    <option value="6">B</option>
                    <option value="5">C</option>
                    <option value="0">U (RA)</option>
                  </>
                )}
              </select>
            </div>
          ))}
          {error && <p className="error-message">{error}</p>}
          <button type="button" onClick={() => setContainerVisible(false)}>
            Back to Menu
          </button>
          <button type="submit">Calculate SGPA</button>
        </form>
      </div>
    );
  } else {
    return (
      <ResultContainer
        score={cgpa}
        setGetData={setView}
        mode="auto"
        onBack={handleBackToInput}
      />
    );
  }
}

export default SubjectCalculator;
