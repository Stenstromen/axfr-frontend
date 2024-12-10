import React from "react";
import PropTypes from "prop-types";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function MobileNavbar({ darkmode, locations }) {
  return (
    <Nav className="me-auto">
      <NavDropdown
        title={
          <span style={{ color: "white" }}>
            Menu
          </span>
        }
        id="basic-nav-dropdown"
        menuVariant={darkmode ? "light" : "dark"}
        style={{
          backgroundColor: darkmode ? "#0d6efd" : "#212529",
          padding: "8px 0",
        }}
      >
        {locations.map((location, index) => (
          <NavDropdown.Item 
            key={index}
            as={Link}
            to={location.path}
            style={{
              backgroundColor: darkmode ? "white" : "#212529",
              color: darkmode ? "black" : "white",
              padding: "8px 0",
            }}
          >
            {location.name}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </Nav>
  );
}

MobileNavbar.propTypes = {
  darkmode: PropTypes.bool,
  locations: PropTypes.array,
};

export default MobileNavbar;
