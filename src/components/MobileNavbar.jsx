import React from "react";
import PropTypes from "prop-types";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function MobileNavbar({ darkmode, locations }) {
  return (
    <>
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
          }}
        >
          <div style={{
            backgroundColor: darkmode ? "white" : "#212529",
          }}>
            {locations.map((location, index) => (
              <Nav.Link as={Link} key={index} to={location.path}>
                <NavDropdown.Item
                  style={{
                    backgroundColor: darkmode ? "white" : "#212529",
                  }}
                >
                  <span style={{
                    color: darkmode ? "black" : "white",
                  }}>
                    {location.name}
                  </span>
                </NavDropdown.Item>
              </Nav.Link>
            ))}
          </div>
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
