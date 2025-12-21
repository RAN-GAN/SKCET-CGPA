import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
function App() {
  return (
    <>
      <Header></Header>
      <div className="visually-hidden">
        <h2>SKCET CGPA & SGPA Calculator for Tamil Nadu Students</h2>
        <p>
          Calculate your SGPA and CGPA easily for SKCET – Sri Krishna College of
          Engineering and Technology, Coimbatore. Works for B.E., B.Tech, M.Tech
          programs under Anna University curriculum.
        </p>
        <ul>
          <li>skcet cgpa calculator</li>
          <li>skcet cgpa calc</li>
          <li>skcet sgpa calculator</li>
          <li>skcet sgpa calc</li>
          <li>anna university gpa calculator 2025</li>
          <li>how to calculate cgpa in skcet</li>
          <li>how to calculate sgpa in skcet</li>
          <li>cgpa calculator for cse 3rd year</li>
          <li>skcet sgpa calculator online</li>
          <li>skcet cgpa calculator online</li>
          <li>skcet civil sgpa calculator</li>
          <li>skcet aids gpa calculator</li>
          <li>engineering sgpa calculator tamilnadu</li>
          <li>skcet grade to cgpa converter</li>
          <li>gpa calculator for autonomous colleges in Coimbatore</li>
        </ul>
        <p>
          This tool supports departments like CSE, IT, ECE, EEE, AIDS, CIVIL,
          MECH, CSBS, CSD, CSY, and MCT. Designed for SKCET students to
          calculate semester results faster with accurate grade point mapping.
        </p>
      </div>

      <LandingPage />
      {/* <Footer></Footer> */}
    </>
  );
}
export default App;
