import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

import { useDefaultProvider } from "../contexts/default";

function Home() {
  const { isMobile, darkmode } = useDefaultProvider();
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Col xl="8" sm>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: darkmode ? "black" : "white" }}>
                New .SE/.NU Domains
              </h2>
            </div>
            <Breadcrumb>
              <Breadcrumb.Item active>Home</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      </Container>
      {isMobile ? (
        <Stack
          style={{ width: "350px", paddingTop: "50px" }}
          gap={3}
          direction="vertical"
          className="col-md-5 mx-auto"
        >
          <Card
            bg={darkmode ? "light" : "dark"}
            text={darkmode ? "dark" : "light"}
            style={{ width: "300px" }}
          >
            <Card.Body>
              <Card.Title>📝 Domain Search</Card.Title>
              <Card.Text>Search For .SE And .NU Domains</Card.Text>
              <Link to={"/search"}>
                <Button variant="primary">Search .SE/.NU Domains</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card
            bg={darkmode ? "light" : "dark"}
            text={darkmode ? "dark" : "light"}
            style={{ width: "300px" }}
          >
            <Card.Body>
              <Card.Title>📝 Fresh .SE Domains</Card.Title>
              <Card.Text>
                Newly Added And Updated .SE Domains, Added Yesterday
              </Card.Text>
              <Link to={"/se"}>
                <Button variant="primary">View .SE Domains</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card
            bg={darkmode ? "light" : "dark"}
            text={darkmode ? "dark" : "light"}
            style={{ width: "300px" }}
          >
            <Card.Body>
              <Card.Title>📝 Fresh .NU Domains</Card.Title>
              <Card.Text>
                Newly Added And Updated .SE Domains, Added Yesterday
              </Card.Text>
              <Link to={"/nu"}>
                <Button variant="primary">View .NU Domains</Button>
              </Link>
            </Card.Body>
          </Card>
        </Stack>
      ) : (
        <Stack
          style={{ width: "80%", paddingTop: "100px" }}
          gap={3}
          direction="horizontal"
          className="col-md-5 mx-auto"
        >
          <Card
            bg={darkmode ? "light" : "dark"}
            text={darkmode ? "dark" : "light"}
            style={{ width: "32rem", height: "200px" }}
          >
            <Card.Body>
              <Card.Title>📝 Domain Search</Card.Title>
              <Card.Text>Search For .SE And .NU Domains</Card.Text>
              <Link to={"/search"}>
                <Button variant="primary">Search .SE/.NU Domains</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card
            bg={darkmode ? "light" : "dark"}
            text={darkmode ? "dark" : "light"}
            style={{ width: "32rem", height: "200px" }}
          >
            <Card.Body>
              <Card.Title>📝 Fresh .SE Domains</Card.Title>
              <Card.Text>
                Newly Added And Updated .SE Domains, Added Yesterday
              </Card.Text>
              <Link to={"/se"}>
                <Button variant="primary">View .SE Domains</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card
            bg={darkmode ? "light" : "dark"}
            text={darkmode ? "dark" : "light"}
            style={{ width: "32rem", height: "200px" }}
          >
            <Card.Body>
              <Card.Title>📝 Fresh .NU Domains</Card.Title>
              <Card.Text>
                Newly Added And Updated .SE Domains, Added Yesterday
              </Card.Text>
              <Link to={"/nu"}>
                <Button variant="primary">View .NU Domains</Button>
              </Link>
            </Card.Body>
          </Card>
        </Stack>
      )}
    </div>
  );
}

export default Home;
