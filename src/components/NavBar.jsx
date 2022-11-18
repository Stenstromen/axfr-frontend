import { useEffect, useState } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  const [sticky, setSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    window.innerWidth < 400 ? setIsMobile(true) : setIsMobile(false);
  }

  function stickNavbar() {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight ? setSticky(true) : setSticky(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);

  return (
    <div>
      {isMobile ? (
        <Navbar expand="sm" bg="dark" variant="dark" fixed={sticky ? "top" : ""}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>AXFR.se</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      ) : (
        <Navbar bg="dark" variant="dark" fixed={sticky ? "top" : ""}>
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
