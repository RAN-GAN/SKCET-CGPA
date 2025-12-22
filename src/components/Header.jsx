import { useState, useEffect, useRef } from "react";

function Header() {
  const [totalCalculations, setTotalCalculations] = useState(null);
  const API_URL = "https://cold-sea-e845.pradeepmojo1708.workers.dev";
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const count = data.data?.up_count || 0;
        setTotalCalculations(count);
      })
      .catch((err) => console.error("Failed to fetch count:", err));
  }, []);

  return (
    <header>
      <h1 className="headerText">
        <span>SKCET SGPA Calculator</span>
        {totalCalculations !== null && totalCalculations !== undefined && (
          <small
            style={{
              display: "block",
              fontSize: "0.7rem",
              fontWeight: "400",
              opacity: 0.8,
              marginTop: "0.25rem",
            }}
          >
            {totalCalculations.toLocaleString()} calculations done
          </small>
        )}
      </h1>
      <a
        href="https://forms.gle/XQo1UHSueXDxYyDd9"
        target="_blank"
        rel="noopener noreferrer"
        className="header-form-link"
        title="Feedback or Subject Request Form"
      >
        Feedback/Request Subjects
      </a>
    </header>
  );
}
export default Header;
