import { useEffect, useState } from "react";
import { useDefaultProvider } from "../contexts/default";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  const [sticky, setSticky] = useState(false);
  const {isMobile} = useDefaultProvider();

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
          bg="primary"
          variant="light"
          fixed={sticky ? "top" : ""}
        >
          <Container>
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
          </Container>
        </Navbar>
      ) : (
        <Navbar bg="primary" variant="light" fixed={sticky ? "top" : ""}>
          <Container>
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
            </Nav>
          </Container>
        </Navbar>
      )}
    </div>
  );
}

export default NavBar;
