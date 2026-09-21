import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PageHeader({ title, breadcrumbs }) {
  return (
    <header className="page-header">
      <ol className="page-crumbs">
        {breadcrumbs.map((crumb, index) => (
          <li key={index}>
            {crumb.link && !crumb.active ? (
              <Link to={crumb.link}>{crumb.text}</Link>
            ) : (
              crumb.text
            )}
          </li>
        ))}
      </ol>
      <h1 className="page-title">{title}</h1>
    </header>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string,
      active: PropTypes.bool,
    })
  ).isRequired,
};

export default PageHeader;
