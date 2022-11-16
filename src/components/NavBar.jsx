import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" sticky="top">
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
    </div>
  );
}

export default NavBar;
