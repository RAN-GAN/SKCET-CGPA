import { useState } from "react";
import Container from "./Container"; // Update the path to the correct file

function LandingPage() {
  const [selectedDept, setSelectedDept] = useState("");
  const [containerVisible, setContainerVisible] = useState(false);
  const departments = [
    "MTech CSE",
    "CSE",
    "CSY",
    "IT",
    "ECE",
    "EEE",
    "CSBS",
    "AIDS",
    "CIVIL",
    "MECH",
    "MCT",
    "CSD",
  ];

  function handleDeptClick(dept) {
    setSelectedDept(dept);
    setContainerVisible(true);
    console.log(selectedDept);
  }

  if (containerVisible) {
    return (
      <div>
        <Container
          dept={selectedDept}
          setContainerVisible={setContainerVisible}
        />
      </div>
    );
  } else {
    return (
      <div>
        <div className="department">
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
                      src={`assests/${department}.webp`}
                      alt={department}
                    />
                    {department}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default LandingPage;
