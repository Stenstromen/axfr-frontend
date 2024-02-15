import React from "react";
import PropTypes from "prop-types";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function DesktopNavbar({ locations }) {
  return (
    <>
      <Nav className="me-auto">
        {locations.map((location, index) => (
          <LinkContainer key={index} to={location.path}>
            <Nav.Link>{location.name}</Nav.Link>
          </LinkContainer>
        ))}
      </Nav>
    </>
  );
}

DesktopNavbar.propTypes = {
  locations: PropTypes.array,
};

export default DesktopNavbar;
