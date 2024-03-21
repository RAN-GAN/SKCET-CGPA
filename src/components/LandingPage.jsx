import React, { useState } from "react";
import MTechContainer from "./Departments/MTechContainer";
import CSYContainer from "./Departments/CSYContainer";
import CSEContainer from "./Departments/CSEContainer";
import ECEContainer from "./Departments/ECEContainer";
import ITContainer from "./Departments/ITContainer";
import AIDSContainer from "./Departments/AIDSContainer";
import CSDContainer from "./Departments/CSDContainer";

function LandingPage() {
  const [selectedDept, setSelectedDept] = useState(null);

  function handleDeptClick(dept) {
    setSelectedDept(dept);
  }

  return (
    <div>
      {selectedDept ? (
        <>
          {selectedDept === "MTech CSE" ? (
            <MTechContainer></MTechContainer>
          ) : selectedDept === "CSY" ? (
            <CSYContainer></CSYContainer>
          ) : selectedDept === "CSE" ? (
            <CSEContainer></CSEContainer>
          ) : selectedDept === "ECE" ? (
            <ECEContainer></ECEContainer>
          ) : selectedDept === "IT" ? (
            <ITContainer></ITContainer>
          ) : selectedDept === "AIDS" ? (
            <AIDSContainer></AIDSContainer>
          ) : selectedDept === "CSD" ? (
            <CSDContainer></CSDContainer>
          ) : selectedDept === "OtherDept" ? (
            <p>Render Other Department component here</p>
          ) : (
            <p>Render default component here</p>
          )}
        </>
      ) : (
        <>
          <div className="department">
            <h2>Choose your Department</h2>
            <div className="departments">
              <div className="dept">
                <button
                  className="deptB"
                  onClick={() => handleDeptClick("MTech CSE")}
                >
                  MTech CSE
                </button>
              </div>
              <div className="dept">
                <button
                  className="deptB"
                  onClick={() => handleDeptClick("CSE")}
                >
                  CSE
                </button>
              </div>
              <div className="dept">
                <button
                  className="deptB"
                  onClick={() => handleDeptClick("CSY")}
                >
                  CSY
                </button>
              </div>
              <div className="dept">
                <button
                  className="deptB"
                  onClick={() => handleDeptClick("ECE")}
                >
                  ECE
                </button>
              </div>
              <div className="dept">
                <button className="deptB" onClick={() => handleDeptClick("IT")}>
                  IT
                </button>
              </div>
              <div className="dept">
                <button
                  className="deptB"
                  onClick={() => handleDeptClick("AIDS")}
                >
                  AI&DS
                </button>
              </div>
              <div className="dept">
                <button
                  className="deptB"
                  onClick={() => handleDeptClick("CSD")}
                >
                  CSD
                </button>
              </div>
              <div className="dept">
                <button className="deptB" onClick={() => handleDeptClick(Null)}>
                  Other Department Will be added soon
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LandingPage;
