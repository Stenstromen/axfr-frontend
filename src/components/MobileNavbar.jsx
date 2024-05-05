import React from "react";
import PropTypes from "prop-types";
import { Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
function MobileNavbar({ darkmode, locations }) {
  return (
    <>
      <Nav className="me-auto">
        <NavDropdown
          title="Domains"
          id="basic-nav-dropdown"
          style={{
            color: darkmode ? "black" : "white",
          }}
        >
          {locations.map((location, index) => (
            <Nav.Link
              key={index}
              style={{
                color: darkmode ? "white" : "black",
                backgroundColor: darkmode ? "white" : "black",
              }}
            >
              <LinkContainer to={location.path}>
                <NavDropdown.Item
                  style={{
                    color: darkmode ? "white" : "black",
                    backgroundColor: darkmode ? "white" : "black",
                  }}
                >
                  {location.name}
                </NavDropdown.Item>
              </LinkContainer>
            </Nav.Link>
          ))}
        </NavDropdown>
      </Nav>
    </>
  );
}

MobileNavbar.propTypes = {
  darkmode: PropTypes.bool,
  locations: PropTypes.array,
};

export default MobileNavbar;
