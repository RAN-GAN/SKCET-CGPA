import { useState, useEffect } from "react";

function StudentResult({ setContainerVisible }) {
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

    // Convert date format only when sending to API
    let apiDob = dob;
    if (dob && dob.includes("-")) {
      const [year, month, day] = dob.split("-");
      apiDob = `${month}/${day}/${year}`;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/addRollnumbertoVenum`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roll: roll, dob: apiDob }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Something went wrong. Please try again later."
        );
        setLoading(false);
        return;
      }

      // Check if the response has the expected structure
      if (data.message && data.student) {
        setResult({
          message: data.message,
          student: data.student,
        });
      } else {
        setError("Unexpected response format. Please try again later.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
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
        <h2>Get your Results directly to your mail!</h2>
        <div id="sgpaForm">
          <label htmlFor="Roll">Enter Your Roll Number</label>
          <input type="text" onChange={handleRollChange} />
          <label htmlFor="dob">Enter Your Date Of Birth</label>
          <input type="date" name="dob" id="dob" onChange={handleDobChange} />
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
  if (result) {
    return (
      <div className="container" style={{ fontSize: "20px" }}>
        <br />
        <h2>✅ Subscribed Successfully!</h2>
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
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
              {result.message}
            </p>
            <p style={{ margin: "5px 0", fontSize: "0.9em" }}>
              📧 Roll Number: <strong>{result.student.roll}</strong>
            </p>
            <p style={{ margin: "5px 0", fontSize: "0.9em" }}>
              📅 DOB: {result.student.dob}
            </p>
            <p style={{ margin: "10px 0 0 0", fontSize: "0.95em" }}>
              You will receive results directly in your email!
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
              fontSize: "1em",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(33,120,197,0.10)",
              marginTop: "8px",
              transition: "background 0.2s",
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
}
export default StudentResult;
