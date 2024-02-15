import React from "react";
import PropTypes from "prop-types";
import { Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function MobileNavbar({ locations }) {
  return (
    <>
      <Nav className="me-auto">
        <NavDropdown title="Domains" id="basic-nav-dropdown">
          {locations.map((location, index) => (
            <Nav.Link key={index}>
              <LinkContainer to={location.path}>
                <NavDropdown.Item>{location.name}</NavDropdown.Item>
              </LinkContainer>
            </Nav.Link>
          ))}
        </NavDropdown>
      </Nav>
    </>
  );
}

MobileNavbar.propTypes = {
  locations: PropTypes.array,
};

export default MobileNavbar;
