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
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  async function fetchResult() {
    setLoading(true);
    setError(null);
    setResult(null);

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
      <div
        className="container"
        style={{ fontSize: "18px", textAlign: "center", padding: "20px" }}
      >
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
          <input required type="text" onChange={handleRollChange} />
          <label htmlFor="dob">Enter Your Date Of Birth</label>
          <input
            required
            type="date"
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
      <div
        className="container"
        style={{
          fontSize: "18px",
          maxWidth: "480px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <br />
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          ⚠️ Oops! We ran into an issue.
        </h2>
        <div id="sgpaForm">
          <div
            style={{
              background: "#fee2e2",
              borderRadius: "8px",
              padding: "16px",
              color: "#b91c1c",
              border: "1px solid #fca5a5",
              marginBottom: "18px",
              textAlign: "center",
            }}
          >
            <p style={{ margin: 0 }}>{error}</p>
          </div>
          <button
            type="button"
            onClick={() => setContainerVisible(false)}
            style={{
              background: "#1d4ed8",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              fontSize: "1em",
              cursor: "pointer",
            }}
            onMouseOver={(e) => (e.target.style.background = "#1e40af")}
            onMouseOut={(e) => (e.target.style.background = "#1d4ed8")}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
  if (result) {
    return (
      <div
        className="container"
        style={{
          fontSize: "18px",
          maxWidth: "480px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <br />
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          ✅ Subscribed Successfully!
        </h2>
        <div id="sgpaForm">
          <div
            style={{
              background: "#e0f2fe",
              borderRadius: "8px",
              padding: "16px",
              color: "#0c4a6e",
              border: "1px solid #bae6fd",
              marginBottom: "18px",
              textAlign: "center",
            }}
          >
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
              {result.message}
            </p>
            <p style={{ margin: "5px 0", fontSize: "0.95em" }}>
              📧 Roll Number: <strong>{result.student.roll}</strong>
            </p>
            <p style={{ margin: "5px 0", fontSize: "0.95em" }}>
              📅 DOB: {result.student.dob}
            </p>
            <p style={{ margin: "10px 0 0", fontSize: "0.95em" }}>
              You will receive results directly in your email!
            </p>
          </div>
          <button type="button" onClick={() => setContainerVisible(false)}>
            Back
          </button>
        </div>
      </div>
    );
  }
}
export default StudentResult;
