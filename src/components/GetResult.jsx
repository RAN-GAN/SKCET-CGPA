import { useState, useEffect } from "react";
// import "./GetResult.css";

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
      setDotCount((prev) => (prev + 1) % 4); // 0 to 3
    }, 500); // update every 500ms

    return () => clearInterval(interval);
  }, []);

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

      // Check if HTTP request failed
      if (!response.ok) {
        setError(
          data.message || "Something went wrong. Please try again later."
        );
        setLoading(false);
        return;
      }

      // Check if API returned success: false
      if (!data.success) {
        setError(data.message || "Request failed. Please try again.");
        setLoading(false);
        return;
      }

      // Check if result object indicates failure
      if (data.result && !data.result.success) {
        setError(
          data.result.error || "Invalid credentials or result not found."
        );
        setLoading(false);
        return;
      }

      // Check if result exists and has subjects
      if (
        !data.result ||
        !data.result.subjects ||
        data.result.subjects.length === 0
      ) {
        setError(
          "No results found. Please check your credentials or try again later."
        );
        setLoading(false);
        return;
      }

      // Success case
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
    console.log("chan");
    setDob(e.target.value);
  }

  function handleSumbit() {
    setDetailsAvailable(true);
    console.log(roll, dob);
    fetchResult();
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
              background: " #6b9edd 80%",
              borderRadius: "12px",
              padding: "20px 24px",
              boxShadow: "0 4px 16px rgba(33, 120, 197, 0.15)",
              color: "#fff",
              marginBottom: "18px",
              border: "1.5px solid #3a6ea5",
              maxWidth: "420px",
              margin: "0 10px 18px 10px",
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
            onMouseOver={(e) => (e.target.style.background = "#245080")}
            onMouseOut={(e) => (e.target.style.background = "#3a6ea5")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
  function getGradeColor(grade) {
    switch (grade) {
      case "O":
        return "#4caf50"; // bright green
      case "A+":
        return "#8bc34a"; // light green
      case "A":
        return "#cddc39"; // lime
      case "B+":
        return "#ffc107"; // amber
      case "B":
        return "#ff9800"; // orange
      case "C":
        return "#f44336"; // red
      default:
        return "#6c757d"; // gray
    }
  }

  if (result) {
    return (
      <div className="container" style={{ fontSize: "18px" }}>
        <br />
        <h2>🎓 Results for {result.roll}</h2>

        <div className="student-info">
          <p style={{ margin: 0, fontSize: "1.1em", fontWeight: 500 }}>
            Semester {result.subjects[0]?.semester} Results
          </p>
        </div>

        <div className="cards-container">
          {result.subjects.map((sub) => (
            <div key={sub.sno} className="result-card">
              <h4>
                {sub.subject_code}{" "}
                <span style={{ fontWeight: 400 }}>({sub.sno})</span>
              </h4>
              <p>{sub.subject_title}</p>
              <div className="result-meta">
                <span
                  className="grade-badge"
                  style={{ backgroundColor: getGradeColor(sub.grade) }}
                >
                  {sub.grade}
                </span>
                <span className={sub.result === "PASS" ? "pass" : "fail"}>
                  {sub.result === "PASS" ? "✅ PASS" : "❌ FAIL"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setContainerVisible(false)}
          className="back-button"
        >
          Back
        </button>
      </div>
    );
  }
}
export default GetResult;
