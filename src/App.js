import React, { useEffect } from "react";
import { useDefaultProvider } from "./contexts/default";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dates from "./pages/Dates";
import Domains from "./pages/Domains";
import Search from "./pages/Search";
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
        <Route path="/se" element={<Dates tld="se" />} />
        <Route path="/nu" element={<Dates tld="nu" />} />
        <Route
          path="/se/:param"
          element={<Domains tld="se" url="sedomains" />}
        />
        <Route
          path="/nu/:param"
          element={<Domains tld="nu" url="nudomains" />}
        />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
