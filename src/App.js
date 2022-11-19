import { useEffect } from "react";
import { useDefaultProvider } from "./contexts/default";
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Se from "./pages/Se"
import SeDomains from './pages/SeDomains';
import NuDomains from './pages/NuDomains';
import Nu from "./pages/Nu"
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';

function App() {
  const {isMobile, setIsMobile} = useDefaultProvider();

  function handleResize() {
    console.log(isMobile)
    window.innerWidth < 425 ? setIsMobile(true) : setIsMobile(false);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  },[]);
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
