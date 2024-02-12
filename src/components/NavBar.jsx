import React, { useEffect, useState } from "react";
import { useDefaultProvider } from "../contexts/default";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

function NavBar() {
  const [sticky, setSticky] = useState(false);
  const { isMobile, darkmode, setDarkmode } = useDefaultProvider();

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
      {isMobile ? (
        <Navbar
          expand="sm"
          bg={darkmode ? "primary" : "dark"}
          variant={darkmode ? "light" : "dark"}
          fixed={sticky ? "top" : ""}
        >
          <Container>
            <img
              alt=""
              src="/dns.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <LinkContainer to="/">
              <Navbar.Brand>AXFR.se</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <NavDropdown title="Domains" id="basic-nav-dropdown">
                <Nav.Link>
                  <LinkContainer to="/">
                    <NavDropdown.Item>Home</NavDropdown.Item>
                  </LinkContainer>
                </Nav.Link>
                <Nav.Link>
                  <LinkContainer to="/search">
                    <NavDropdown.Item>Domain Search</NavDropdown.Item>
                  </LinkContainer>
                </Nav.Link>
                <Nav.Link>
                  <LinkContainer to="/se">
                    <NavDropdown.Item>.SE</NavDropdown.Item>
                  </LinkContainer>
                </Nav.Link>
                <Nav.Link>
                  <LinkContainer to="/nu">
                    <NavDropdown.Item>.NU</NavDropdown.Item>
                  </LinkContainer>
                </Nav.Link>
              </NavDropdown>
            </Nav>
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
      ) : (
        <Navbar
          bg={darkmode ? "primary" : "dark"}
          variant={darkmode ? "light" : "dark"}
          fixed={sticky ? "top" : ""}
        >
          <Container>
            <img
              alt=""
              src="/dns.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <LinkContainer to="/">
              <Navbar.Brand>AXFR.se</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <LinkContainer to="/se">
                <Nav.Link>.SE</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/nu">
                <Nav.Link>.NU</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/search">
                <Nav.Link>Domain Search</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/stats">
                <Nav.Link>Domain Stats</Nav.Link>
              </LinkContainer>
            </Nav>
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
      )}
    </div>
  );
}

export default NavBar;
