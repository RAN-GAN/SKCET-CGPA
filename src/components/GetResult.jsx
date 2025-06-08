import { useState, useEffect } from "react";

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
    const response = await fetch(`${BASE_URL}/api/getResult`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roll: roll, dob: dob }),
    });
    setLoading(false);
    if (!response.ok) {
      setError("Something went wrong. Please try again later.");
    }
    const data = await response.json();
    if (!data.result) {
      setError("Invalid credentials or the result hasn't been published yet.");
    }
    setResult(data.result);
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
        <h2> Here you go...</h2>
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
            <p
              style={{ margin: 0, whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{
                __html: result
                  .replace(/\n/g, "<br />")
                  .replace(/\*(.*?)\*/g, "<b>$1</b>"), // bold for *text*
              }}
            />
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
}
export default GetResult;
