import React, { useEffect } from "react";
import { useDefaultProvider } from "../contexts/default";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { Nav } from "react-bootstrap";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

function NavBar() {
  const { isMobile, darkmode, setDarkmode } = useDefaultProvider();

  const locations = [
    { name: ".SE", path: "/se" },
    { name: ".NU", path: "/nu" },
    { name: "Domain Search", path: "/search" },
    { name: "First Appearance", path: "/first-appearance" },
    { name: "Domain Stats", path: "/stats" },
  ];

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", darkmode ? "#0d6efd" : "#212529");
    }
  }, [darkmode]);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 1020 }}>
      <Navbar
        bg={darkmode ? "primary" : "dark"}
        variant={darkmode ? "light" : "dark"}
      >
        <Container>
          <img
            alt="AXFR.se Logo"
            src="/dns.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            aria-label="AXFR.se Logo"
          />
          <Navbar.Brand as={Link} to="/">
            AXFR.se
          </Navbar.Brand>
          {isMobile ? (
            <MobileNavbar
              locations={locations}
              darkmode={darkmode}
              setDarkmode={setDarkmode}
            />
          ) : (
            <DesktopNavbar
              locations={locations}
              darkmode={darkmode}
              setDarkmode={setDarkmode}
            />
          )}
          <Nav>
            <Nav.Link onClick={() => setDarkmode(!darkmode)}>
              {darkmode ? (
                <MdOutlineDarkMode size={25} />
              ) : (
                <MdOutlineLightMode size={25} />
              )}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
