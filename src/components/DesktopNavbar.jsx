import React from "react";
import PropTypes from "prop-types";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function DesktopNavbar({ locations }) {
  return (
    <>
      <Nav className="me-auto">
        {locations.map((location, index) => (
          <Nav.Link key={index} as={Link} to={location.path}>
            {location.name}
          </Nav.Link>
        ))}
      </Nav>
    </>
  );
}

DesktopNavbar.propTypes = {
  locations: PropTypes.array,
};

export default DesktopNavbar;
