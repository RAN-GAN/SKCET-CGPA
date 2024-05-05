import { useState } from "react";
import Container from "./Container";

function LandingPage() {
  const [selectedDept, setSelectedDept] = useState("");
  const [containerVisible, setContainerVisible] = useState(false);
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

  function handleDeptClick(dept) {
    setSelectedDept(dept);
    setContainerVisible(true);
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
                      src={`${department}.webp`}
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
