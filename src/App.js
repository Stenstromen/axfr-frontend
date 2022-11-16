import logo from './logo.svg';
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
