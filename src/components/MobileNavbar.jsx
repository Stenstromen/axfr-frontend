import React from "react";
import PropTypes from "prop-types";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

function MobileNavbar({ locations }) {
  return (
    <Nav className="me-auto">
      <NavDropdown
        title="Menu"
        id="basic-nav-dropdown"
        className="mobile-menu-toggle"
      >
        {locations.map((location) => (
          <NavDropdown.Item
            key={location.path}
            as={Link}
            to={location.path}
            className="axfr-dropdown-item"
          >
            {location.name}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </Nav>
  );
}

MobileNavbar.propTypes = {
  locations: PropTypes.array,
};

export default MobileNavbar;
