import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

function DesktopNavbar({ locations }) {
  return (
    <nav className="axfr-links">
      {locations.map((location) => (
        <NavLink
          key={location.path}
          to={location.path}
          className={({ isActive }) =>
            `axfr-nav-link${isActive ? " is-active" : ""}`
          }
        >
          {location.name}
        </NavLink>
      ))}
    </nav>
  );
}

DesktopNavbar.propTypes = {
  locations: PropTypes.array,
};

export default DesktopNavbar;
