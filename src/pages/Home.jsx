import React from "react";
import PropTypes from "prop-types";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDefaultProvider } from "../contexts/default";

function Home({ tlds }) {
  const { darkmode } = useDefaultProvider();

  const cards = [
    {
      title: "Domain Search",
      text: (
        <>
          Search&nbsp;
          {tlds.map((item) => (
            <React.Fragment key={item}>.{item.toUpperCase()}&nbsp;</React.Fragment>
          ))}
          Domains
        </>
      ),
      link: "/search",
      buttonText: "Search Domains",
    },
    {
      title: "Domain First Appearance",
      text: ".SE/.NU Domains that have appeared for the first time (in my records)",
      link: "/first-appearance",
      buttonText: "View First Appearance",
    },
    {
      title: "Domain Stats",
      text: "Domain stats for .SE, .NU, .CH, .LI, .EE, .SK",
      link: "/stats",
      buttonText: "View Domain Stats",
    },
    {
      title: "Fresh .SE Domains",
      text: "Newly Added And Updated .SE Domains, Added Yesterday",
      link: "/se",
      buttonText: "View .SE Domains",
    },
    {
      title: "Fresh .NU Domains",
      text: "Newly Added And Updated .NU Domains, Added Yesterday",
      link: "/nu",
      buttonText: "View .NU Domains",
    },
  ];

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xl="8" sm>
            <div className="text-center my-4">
              <h2 style={{ color: darkmode ? "black" : "white" }}>
                New .SE/.NU Domains
              </h2>
            </div>
            <Breadcrumb>
              <Breadcrumb.Item active>Home</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
        <div className="card-grid">
          {cards.map((card, index) => (
            <Card
              key={index}
              bg={darkmode ? "light" : "dark"}
              text={darkmode ? "dark" : "light"}
              className="card-item"
            >
              <Card.Body>
                <Card.Title>📝 {card.title}</Card.Title>
                <Card.Text>{card.text}</Card.Text>
                <Link to={card.link}>
                  <Button variant="primary">{card.buttonText}</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
}

Home.propTypes = {
  tlds: PropTypes.array.isRequired,
};

export default Home;
