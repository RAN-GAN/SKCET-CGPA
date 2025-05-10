import { useState } from "react";
import Calculate from "./Calculate";
import { subjectsByYear } from "../data/subjectsData";
import SubjectCalculator from "./SubjectCalculator";
function LandingPage() {
  const [selectedDept, setSelectedDept] = useState("");
  const [containerVisible, setContainerVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState("");

  const departments = [
    "MTech CSE",
    "AIDS",
    "CIVIL",
    "CSBS",
    "CSD",
    "CSE",
    "CSY",
    "ECE",
    "EEE",
    "IT",
    "MCT",
    "MECH",
  ];

  const years = Object.keys(subjectsByYear);

  function handleDeptClick(dept) {
    setSelectedDept(dept);
    setContainerVisible(true);
  }

  function handleYourselfClick() {
    console.log("Yourself");
    setSelectedDept("Yourself");
    setContainerVisible(true);
  }

  function handleYearClick(year) {
    setSelectedYear(year);
  }

  function handleBack() {
    setSelectedYear("");
  }
  if (containerVisible) {
    if (selectedDept === "Yourself") {
      return (
        <Calculate
          setContainerVisible={setContainerVisible}
          dept={selectedDept}
        />
      );
    } else if (selectedYear) {
      return (
        <SubjectCalculator
          year={selectedYear}
          dept={selectedDept}
          setContainerVisible={setContainerVisible}
        />
      );
    }
  }

  return (
    <div>
      <div className="department">
        <h2>Calculate Yourself</h2>
        <div className="yourself">
          <button className="deptB" type="button" onClick={handleYourselfClick}>
            <div className="LogoNameWrapper">
              <img
                className="deptLogo"
                src={`calculator.webp`}
                alt="yourself"
              />
              Calculate Yourself
            </div>
          </button>
        </div>
        <h3>Or</h3>

        {/* Year Selection (Hidden after selection) */}
        {!selectedYear && (
          <div className="year">
            <h2>Choose your current year</h2>
            <div className="years">
              {years.map((year) => (
                <div className="year" key={year}>
                  <button
                    className="deptB"
                    type="button"
                    onClick={() => handleYearClick(year)}
                  >
                    <div className="LogoNameWrapper">{year}</div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Show departments after selecting a year */}
        {selectedYear && (
          <div className="depts">
            <h2>Choose your Department</h2>
            <div className="departments">
              {departments.map((department) => (
                <div className="dept" key={department}>
                  <button
                    className="deptB"
                    type="button"
                    onClick={() => handleDeptClick(department)}
                  >
                    <div className="LogoNameWrapper">
                      <img
                        className="deptLogo"
                        src={`${department}.webp`}
                        alt={department}
                      />
                      {department}
                    </div>
                  </button>
                </div>
              ))}
              <div className="dept">
                <button
                  className="deptB back"
                  type="button"
                  onClick={handleBack}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
