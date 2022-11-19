import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: process.env.REACT_APP_AUTHORIZATION,
  },
};

function NuDomains() {
  const { param } = useParams();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pagefull, setPagefull] = useState(false);
  const [domains, setDomains] = useState([]);

  function bottom() {
    if (pagefull) return;
    setPage(page + 1);
    setLoading(true);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  useBottomScrollListener(bottom);

  useEffect(() => {
    axios.get(URL + `/nu/${param}/${page}`, CONFIG).then((response) => {
      setLoading(false);
      if (response.data.length === 0) {
        setPagefull(true);
        return;
      }
      setDomains(domains.concat(response.data));
    });
  }, [page]);

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
              <h2>
                New .NU Domains for{" "}
                {param.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3")}
              </h2>
            </div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={"/"}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={"/nu"}>NU</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>{param}</Breadcrumb.Item>
            </Breadcrumb>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Domain Name</th>
                </tr>
              </thead>
              <tbody>
                {domains.map((item) => {
                  return (
                    <tr>
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
              }}
            >
              {loading ? <BeatLoader loading /> : ""}
              {pagefull ? (
                <Button variant="success" onClick={scrollToTop}>
                  Back to top
                </Button>
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NuDomains;
