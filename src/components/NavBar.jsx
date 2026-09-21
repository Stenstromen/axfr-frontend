import React, { useEffect } from "react";
import { useDefaultProvider } from "../contexts/default";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

function NavBar() {
  const { isMobile, darkmode, setDarkmode } = useDefaultProvider();

  const locations = [
    { name: ".SE", path: "/se" },
    { name: ".NU", path: "/nu" },
    { name: "Search", path: "/search" },
    { name: "First seen", path: "/first-appearance" },
    { name: "Stats", path: "/stats" },
  ];

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", darkmode ? "#f3f5fb" : "#07090f");
    }
  }, [darkmode]);

  return (
    <div className="axfr-nav-wrap">
      <Navbar className="axfr-nav">
        <Container>
          <Link to="/" className="brand-link">
            <span className="brand-mark">
              <img src="/dns.png" alt="" width="20" height="20" />
            </span>
            <span className="brand-word">
              AXFR<span>.se</span>
            </span>
          </Link>
          {isMobile ? (
            <MobileNavbar locations={locations} />
          ) : (
            <DesktopNavbar locations={locations} />
          )}
          <button
            type="button"
            className="theme-toggle"
            aria-label={darkmode ? "Switch to dark mode" : "Switch to light mode"}
            onClick={() => setDarkmode(!darkmode)}
          >
            {darkmode ? (
              <MdOutlineDarkMode size={20} />
            ) : (
              <MdOutlineLightMode size={20} />
            )}
          </button>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
