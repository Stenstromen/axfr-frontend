import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

function PageHeader({ title, breadcrumbs, darkmode }) {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xl="8" sm>
          <div className="text-center my-4">
            <h2 style={{ color: darkmode ? "black" : "white" }}>
              {title}
            </h2>
          </div>
          <Breadcrumb>
            {breadcrumbs.map((crumb, index) => (
              <Breadcrumb.Item
                key={index}
                active={crumb.active}
                style={crumb.active ? { color: darkmode ? "black" : "white" } : {}}
              >
                {crumb.link ? (
                  <Link to={crumb.link}>{crumb.text}</Link>
                ) : (
                  crumb.text
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </Col>
      </Row>
    </Container>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      link: PropTypes.string,
      active: PropTypes.bool
    })
  ).isRequired,
  darkmode: PropTypes.bool.isRequired
};

export default PageHeader; 