import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useDefaultProvider } from "../contexts/default";

const URL = process.env.REACT_APP_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: process.env.REACT_APP_AUTHORIZATION,
  },
};

function Domains(props) {
  const { param } = useParams();
  const [page, setPage] = useState(0);
  const [pagefull, setPagefull] = useState(false);
  const [domains, setDomains] = useState([]);
  const { darkmode } = useDefaultProvider();

  function bottom() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  useEffect(() => {
    axios
      .get(URL + `/${props.tld}/${param}/${page}`, CONFIG)
      .then((response) => {
        if (response.data.length === 0) {
          setPagefull(true);
          return;
        }
        return setDomains(domains.concat(response.data));
      });
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", bottom);
    return () => window.removeEventListener("scroll", bottom);
  }, [domains]);

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
                .{props.tld.toUpperCase()} Domains for{" "}
                {param.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3")}
              </h2>
            </div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={"/"}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/${props.tld}`}>{props.tld.toUpperCase()}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{param}</Breadcrumb.Item>
            </Breadcrumb>
            <Table striped bordered variant={darkmode ? "light" : "dark"}>
              <thead>
                <tr>
                  <th>Domain Name</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((item) => {
                  return (
                    <tr key={item.domain}>
                      <td key={item.domain}>{item.domain}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column-reverse",
              }}
            >
              {pagefull ? (
                <Button
                  style={{ marginBottom: "20px" }}
                  variant="success"
                  onClick={scrollToTop}
                >
                  Back to top <AiOutlineArrowUp />
                </Button>
              ) : (
                <Button onClick={() => bottom()} variant="primary" size="sm">
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Next Page
                </Button> 
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Domains;
