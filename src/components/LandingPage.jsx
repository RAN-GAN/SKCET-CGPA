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
    setSelectedDept("Yourself");
    setContainerVisible(true);
  }
  function handleGetResult() {
    setSelectedDept("Get Result");
    setContainerVisible(true);
  }
  function handleStudentUpdate() {
    setSelectedDept("student update");
    setContainerVisible(true);
  }

  function handleYearClick(year) {
    setSelectedYear(year);
  }

  function handleBack() {
    setSelectedYear("");
  }
  if (containerVisible) {
    if (selectedDept === "Get Result") {
      return (
        <GetResult
          setContainerVisible={setContainerVisible}
          dept={selectedDept}
        />
      );
    } else if (selectedDept === "student update") {
      return (
        <StudentResult
          setContainerVisible={setContainerVisible}
          dept={selectedDept}
        />
      );
    } else if (selectedDept === "Yourself") {
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
        <div className="yourself years">
          <button className="deptB" type="button" onClick={handleYourselfClick}>
            <div className="LogoNameWrapper">
              <img className="deptLogo" src={`calculator.png`} alt="yourself" />
              Calculate Yourself
            </div>
          </button>
          {/* <button className="deptB" type="button" onClick={handleGetResult}>
            <div className="LogoNameWrapper">
              <img
                className="deptLogo"
                src={`notepad.png`}
                alt="Check Result"
              />
              Check Result
            </div>
          </button> */}
          {/* <button className="deptB" type="button" onClick={handleStudentUpdate}>
            <div className="LogoNameWrapper">
              <img
                className="deptLogo"
                src={`notepad.png`}
                alt="subscribe to result"
              />
              Subscribe to results
            </div>
          </button> */}
        </div>
        <h3>Or</h3>

        {!selectedYear && (
          <div className="year">
            <h2>Select Year of Study</h2>
            <div className="years">
              {years.map((year) => (
                <div
                  title="Choose the year you wrote the exam, not your current year."
                  className="year"
                  key={year}
                >
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
