import React, { useEffect, useState } from "react";
import { useDefaultProvider } from "../contexts/default";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { Nav } from "react-bootstrap";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

function NavBar() {
  const [sticky, setSticky] = useState(false);
  const { isMobile, darkmode, setDarkmode } = useDefaultProvider();

  const locations = [
    { name: ".SE", path: "/se" },
    { name: ".NU", path: "/nu" },
    { name: "Domain Search", path: "/search" },
    { name: "First Appearance", path: "/first-appearance" },
    { name: "Domain Stats", path: "/stats" },
  ];

  function stickNavbar() {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight ? setSticky(true) : setSticky(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  return (
    <div>
      <Helmet>
        <meta name="theme-color" content={darkmode ? "#0d6efd" : "#212529"} />
      </Helmet>
      <Navbar
        bg={darkmode ? "primary" : "dark"}
        variant={darkmode ? "light" : "dark"}
        fixed={sticky ? "top" : ""}
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
