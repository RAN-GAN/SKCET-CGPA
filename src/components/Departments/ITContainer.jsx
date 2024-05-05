import { useState } from "react";
import Footer from "../Footer";

function ITContainer() {
  const [getData, setGetData] = useState(true);
  const [result, setResult] = useState("");

  function calculateSGPA() {
    const credits = {
      maths: 4,
      adp: 3,
      cpp: 4,
      owc: 3,
      dld: 4,
      hot: 1,
    };

    const grade1 = document.getElementById("grade1").value;
    const grade2 = document.getElementById("grade2").value;
    const grade3 = document.getElementById("grade3").value;
    const grade4 = document.getElementById("grade4").value;
    const grade5 = document.getElementById("grade5").value;
    const grade6 = document.getElementById("grade6").value;

    const totalCredits =
      credits.maths +
      credits.adp +
      credits.cpp +
      credits.owc +
      credits.dld +
      credits.hot;
    let totalGradePoints = 0;
    totalGradePoints += credits.cpp * getGradePoints(grade1);
    totalGradePoints += credits.dld * getGradePoints(grade2);
    totalGradePoints += credits.owc * getGradePoints(grade3);
    totalGradePoints += credits.adp * getGradePoints(grade4);
    totalGradePoints += credits.maths * getGradePoints(grade5);
    totalGradePoints += credits.hot * getGradePoints(grade6);

    const sgpa = totalGradePoints / totalCredits;
    setResult(sgpa.toFixed(2));
    setGetData(false);

    function getGradePoints(grade) {
      switch (grade) {
        case "O":
          return 10;
        case "A+":
          return 9;
        case "A":
          return 8;
        case "B+":
          return 7;
        case "B":
          return 6;
        case "C":
          return 5;
        case "U":
          return 0;
        default:
          return 0;
      }
    }
  }

  if (getData) {
    return (
      <>
        <div className="container">
          <h1 style={{ textAlign: "center" }}>IT 1'st semester</h1>
          <h2>SGPA Calculator</h2>
          <form id="sgpaForm">
            <label htmlFor="grade1">PROBLEM SOLVING USING C++:</label> <br />
            <select id="grade1" name="grade1">
              <option value="\0">-select-</option>
              <option value="O">O</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="U">U</option>
            </select>
            <input type="hidden" name="credit1" value="4.5" />
            <br />
            <br />
            <label htmlFor="grade2">
              DIGITAL LOGIC DESIGN AND COMPUTER ARCHITECTURE:
            </label>{" "}
            <br />
            <select id="grade2" name="grade2">
              <option value="\0">-select-</option>
              <option value="O">O</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="U">U</option>
            </select>
            <input type="hidden" name="credit2" value="3" />
            <br />
            <br />
            <label htmlFor="grade3">
              ORAL AND WRITTEN COMMUNICATION SKILLS:
            </label>
            <br />
            <select id="grade3" name="grade3">
              <option value="\0">-select-</option>
              <option value="O">O</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="U">U</option>
            </select>
            <input type="hidden" name="credit3" value="4" />
            <br />
            <br />
            <label htmlFor="grade4">
              APPLICATION DEVELOPMENT PRACTICES:
            </label>{" "}
            <br />
            <select id="grade4" name="grade4">
              <option value="\0">-select-</option>
              <option value="O">O</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="U">U</option>
            </select>
            <input type="hidden" name="credit4" value="3" />
            <br />
            <br />
            <label htmlFor="grade5">MATHEMATICS I</label> <br />
            <select id="grade5" name="grade5">
              <option value="\0">-select-</option>
              <option value="O">O</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="U">U</option>
            </select>
            <input type="hidden" name="credit5" value="4" />
            <br />
            <br />
            <label htmlFor="grade6">Heritage of Tamils:</label> <br />
            <select id="grade6" name="grade6">
              <option value="\0">-select-</option>
              <option value="O">O</option>
              <option value="A+">A+</option>
              <option value="A">A</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="U">U</option>
            </select>
            <input type="hidden" name="credit6" value="1" />
            <br />
            <br />
            <button type="button" onClick={calculateSGPA}>
              Calculate
            </button>
            <button type="button" onClick={() => window.location.reload()}>
              BACK
            </button>
          </form>
        </div>
        <Footer></Footer>
      </>
    );
  } else {
    return (
      <div className="container rcon">
        <h2>Your tentative SGPA is</h2>
        <h3>{result}</h3>
        <button className="back" type="button" onClick={() => setGetData(true)}>
          Back
        </button>
      </div>
    );
  }
}
export default ITContainer;