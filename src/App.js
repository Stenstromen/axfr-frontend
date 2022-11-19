import { useEffect } from "react";
import { useDefaultProvider } from "./contexts/default";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Se from "./pages/Se";
import SeDomains from "./pages/SeDomains";
import NuDomains from "./pages/NuDomains";
import Nu from "./pages/Nu";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import setBodyColor from "./setBodyColor";

function App() {
  const { setIsMobile, darkmode, setDarkmode } = useDefaultProvider();

  darkmode
    ? setBodyColor({ color: "lightblack" })
    : setBodyColor({ color: "#252525" });

  function handleResize() {
    window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkmode(!darkmode);
    }
  }, []);

  handleResize();
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/se" element={<Se />} />
        <Route path="/se/:param" element={<SeDomains />} />
        <Route path="/nu" element={<Nu />} />
        <Route path="/nu/:param" element={<NuDomains />} />
      </Routes>
    </div>
  );
}

export default App;
