import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { AiOutlineArrowUp } from "react-icons/ai";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { useDefaultProvider } from "../contexts/default";
import punycode from 'punycode';

const URL = import.meta.env.VITE_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: import.meta.env.VITE_AUTHORIZATION,
  },
};

const formatDomain = (domain, darkmode) => {
  try {
    const decoded = punycode.toUnicode(domain);
    if (decoded !== domain) {
      return (
        <span>
          {decoded} <span style={{ color: darkmode ? "#6c757d" : "#adb5bd" }}>({domain})</span>
        </span>
      );
    }
    return domain;
  } catch (error) {
    console.error("Punycode conversion error:", error);
    return domain;
  }
};

function Domains(props) {
  const { param } = useParams();
  const [page, setPage] = useState(0);
  const [pagefull, setPagefull] = useState(false);
  const [domains, setDomains] = useState([]);
  const { darkmode } = useDefaultProvider();
  const [isLoading, setIsLoading] = useState(false);

  const getUrlPath = () => {
    switch (props.tld) {
      case 'se':
        return 'sedomains';
      case 'nu':
        return 'nudomains';
      default:
        return props.url;
    }
  };

  const bottom = useCallback(() => {
    if (isLoading || pagefull) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 800) {
      setIsLoading(true);
      setPage(prev => prev + 1);
    }
  }, [isLoading, pagefull]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(URL + `/${getUrlPath()}/${param}/0`, CONFIG)
      .then((response) => {
        if (response.data == null) {
          setPagefull(true);
        } else {
          setDomains(response.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [param, props.tld]);

  useEffect(() => {
    if (page === 0) return;

    setIsLoading(true);
    axios
      .get(URL + `/${getUrlPath()}/${param}/${page}`, CONFIG)
      .then((response) => {
        if (response.data == null) {
          setPagefull(true);
        } else {
          setDomains(prev => [...prev, ...response.data]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.tld, page, param]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        bottom();
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [bottom]);

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
              <Breadcrumb.Item variant={darkmode ? "light" : "dark"} active>
                {param}
              </Breadcrumb.Item>
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
                      <td key={item.domain}>{formatDomain(item.domain, darkmode)}</td>
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

Domains.propTypes = {
  tld: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Domains;
