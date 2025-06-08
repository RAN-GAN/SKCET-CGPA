import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer";
function App() {
  console.log(import.meta.env.VITE_BASE_API);
  return (
    <>
      <Header></Header>
      <LandingPage />
      {/* <Footer></Footer> */}
    </>
  );
}
export default App;
