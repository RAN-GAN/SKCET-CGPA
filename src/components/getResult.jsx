import { useState, useEffect } from "react";
import { subjectsByYear } from "../data/subjectsData";

function GetResult({ setContainerVisible }) {
  const BASE_URL = import.meta.env.VITE_BASE_API;
  const [roll, setRoll] = useState(null);
  const [dob, setDob] = useState(null);
  const [detailsAvailable, setDetailsAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Helper function to get department from roll number
  function getDepartmentFromRoll(roll) {
    if (!roll) return null;
    const rollStr = roll.toLowerCase();
    if (rollStr.includes("cs")) return "CSE";
    if (rollStr.includes("ai")) return "AIDS";
    if (rollStr.includes("cv")) return "CIVIL";
    if (rollStr.includes("cd")) return "CSD";
    if (rollStr.includes("cy")) return "CSY";
    if (rollStr.includes("cb")) return "CSBS";
    if (rollStr.includes("ec")) return "ECE";
    if (rollStr.includes("ee")) return "EEE";
    if (rollStr.includes("it")) return "IT";
    if (rollStr.includes("mct")) return "MCT";
    if (rollStr.includes("mc")) return "MECH";
    if (rollStr.includes("ci")) return "MTech CSE";
    return null;
  }

  // Helper function to get year from semester
  function getYearFromSemester(semester) {
    const sem = parseInt(semester);
    if (sem <= 2) return "1st Year";
    if (sem <= 4) return "2nd Year";
    if (sem <= 6) return "3rd Year";
    return "4th Year";
  }

  // Helper function to calculate SGPA
  function calculateSGPA(subjects, department, semester) {
    const year = getYearFromSemester(semester);
    const dept = getDepartmentFromRoll(department);

    console.log("Debug SGPA Calculation:");
    console.log("Year:", year, "Department:", dept, "Semester:", semester);

    if (!dept || !subjectsByYear[year] || !subjectsByYear[year][dept]) {
      console.log("No department data found");
      return null;
    }

    const departmentSubjects = subjectsByYear[year][dept];
    console.log("Available subjects with credits:", departmentSubjects);

    let totalGradePoints = 0;
    let totalCredits = 0;
    let matchedSubjects = [];

    subjects.forEach((subject) => {
      // Find matching subject in departmentSubjects
      const matchingSubject = Object.keys(departmentSubjects).find(
        (deptSub) =>
          deptSub
            .toLowerCase()
            .includes(subject.subject_title.toLowerCase().split(" ")[0]) ||
          subject.subject_title
            .toLowerCase()
            .includes(deptSub.toLowerCase().split(" ")[0]),
      );

      if (matchingSubject) {
        const credits = departmentSubjects[matchingSubject];
        const gradePoints = getGradePoints(subject.grade);

        if (gradePoints !== null && credits > 0) {
          totalGradePoints += gradePoints * credits;
          totalCredits += credits;

          matchedSubjects.push({
            original: subject.subject_title,
            matched: matchingSubject,
            grade: subject.grade,
            gradePoints,
            credits,
            contribution: gradePoints * credits,
          });
        }
      } else {
        console.log("No match found for:", subject.subject_title);
      }
    });

    console.log("Matched subjects:", matchedSubjects);
    console.log("Total grade points:", totalGradePoints);
    console.log("Total credits:", totalCredits);

    const sgpa =
      totalCredits > 0
        ? Math.round((totalGradePoints / totalCredits) * 100) / 100
        : null;
    console.log("Calculated SGPA:", sgpa);

    return sgpa;
  }

  // Helper function to convert grade to points
  function getGradePoints(grade) {
    switch (grade) {
      case "O":
        return 10;
      case "A+":
        return 9;
      case "A":
        return 8;
      case "B+":
        return 7;
      case "B":
        return 6;
      case "C":
        return 5;
      default:
        return 0;
    }
  }

  async function fetchResult() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${BASE_URL}/api/getResult`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roll: roll, dob: dob }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Something went wrong. Please try again later.",
        );
        setLoading(false);
        return;
      }

      if (!data.success) {
        setError(data.message || "Request failed. Please try again.");
        setLoading(false);
        return;
      }

      if (data.result && !data.result.success) {
        setError(
          data.result.error || "Invalid credentials or result not found.",
        );
        setLoading(false);
        return;
      }

      if (
        !data.result ||
        !data.result.subjects ||
        data.result.subjects.length === 0
      ) {
        setError(
          "No results found. Please check your credentials or try again later.",
        );
        setLoading(false);
        return;
      }

      // Calculate SGPA for semesters 2 and 4
      const semester = data.result.subjects[0]?.semester;
      const sgpa = calculateSGPA(
        data.result.subjects,
        data.result.roll,
        semester,
      );
      data.result.calculatedSGPA = sgpa;

      setResult(data.result);
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    }

    setLoading(false);
  }

  function handleRollChange(e) {
    setRoll(e.target.value);
  }

  function handleDobChange(e) {
    setDob(e.target.value);
  }

  function handleSumbit() {
    setDetailsAvailable(true);
    fetchResult();
  }

  function getGradeColor(grade) {
    switch (grade) {
      case "O":
        return "#4caf50";
      case "A+":
        return "#8bc34a";
      case "A":
        return "#cddc39";
      case "B+":
        return "#ffc107";
      case "B":
        return "#ff9800";
      case "C":
        return "#f44336";
      default:
        return "#6c757d";
    }
  }

  if (loading) {
    return (
      <div className="container" style={{ fontSize: "20px" }}>
        <br />
        <h2>Please Wait{".".repeat(dotCount)}</h2>
      </div>
    );
  }

  if (!detailsAvailable) {
    return (
      <div className="container" style={{ fontSize: "20px" }}>
        <br />
        <h2>Get your Results here!</h2>
        <div id="sgpaForm">
          <label htmlFor="Roll">Enter Your Roll Number</label>
          <input type="text" required onChange={handleRollChange} />
          <label htmlFor="dob">Enter Your Date Of Birth</label>
          <input
            type="date"
            required
            name="dob"
            id="dob"
            onChange={handleDobChange}
          />
          <button type="button" onClick={() => setContainerVisible(false)}>
            Back
          </button>
          <button type="button" onClick={handleSumbit}>
            Submit
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ fontSize: "20px" }}>
        <br />
        <h2>⚠️ Oops! We ran into an issue.</h2>
        <div id="sgpaForm">
          <div
            style={{
              background: "linear-gradient(135deg, #6b9edd 80%, #3a6ea5 100%)",
              borderRadius: "12px",
              padding: "20px 24px",
              boxShadow: "0 4px 16px rgba(33, 120, 197, 0.15)",
              color: "#fff",
              marginBottom: "18px",
              border: "1.5px solid #3a6ea5",
              maxWidth: "420px",
              margin: "0 auto 18px auto",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0, color: "rgba(255, 216, 216, 0.8)" }}>
              {error}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setContainerVisible(false)}
            style={{
              background: "#3a6ea5",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "10px 22px",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.background = "#245080")}
            onMouseOut={(e) => (e.target.style.background = "#3a6ea5")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (result) {
    const semester = result.subjects[0]?.semester;
    const showSGPA =
      (semester === "2" || semester === "4") && result.calculatedSGPA;

    return (
      <div
        className="container result-table-container"
        style={{ fontSize: "18px", maxWidth: 800, margin: "0 auto" }}
      >
        <br />
        <h2>Results for {result.roll}</h2>
        <div style={{ marginBottom: 16 }}>
          <strong>Semester {semester} Results</strong>
          {showSGPA && (
            <span
              style={{ marginLeft: 16, fontWeight: "bold", color: "#feb414" }}
            >
              SGPA: {result.calculatedSGPA}
            </span>
          )}
        </div>
        <div style={{ width: "100%", overflowX: "auto" }}>
          <table className="proper-result-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Code</th>
                <th>Subject</th>
                <th>Grade</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {result.subjects.map((sub, idx) => (
                <tr
                  key={sub.sno}
                  className={idx % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{sub.sno}</td>
                  <td>{sub.subject_code}</td>
                  <td style={{ textAlign: "left" }}>{sub.subject_title}</td>
                  <td>
                    <span
                      className="grade-badge"
                      style={{ background: getGradeColor(sub.grade) }}
                    >
                      {sub.grade}
                    </span>
                  </td>
                  <td>
                    {sub.result === "PASS" ? (
                      <span className="pass">PASS</span>
                    ) : (
                      <span className="fail">FAIL</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="back" style={{ marginTop: 24, textAlign: "center" }}>
          <button
            type="button"
            onClick={() => setContainerVisible(false)}
            className="back-button"
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}

export default GetResult;
