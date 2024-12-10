import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useDefaultProvider } from "../contexts/default";
import axios from "axios";

const URL = import.meta.env.VITE_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: import.meta.env.VITE_AUTHORIZATION,
  },
};

function FirstAppearance() {
  const { darkmode } = useDefaultProvider();
  const [tld, setTld] = useState("se");
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tlds = ["se", "nu"];

  const handleSearch = async () => {
    if (!domain) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.get(
        `${URL}/${tld}appearance/${domain}.${tld}`,
        CONFIG
      );
      setResult(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Domain not found or an error occurred");
    } finally {
      setLoading(false);
    }
  };

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
                First Appearance Search
              </h2>
            </div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={"/"}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item
                active
                style={{ color: darkmode ? "black" : "white" }}
              >
                First Appearance (in my records)
              </Breadcrumb.Item>
            </Breadcrumb>
            <ButtonGroup
              style={{
                width: "100%",
                paddingBottom: "10px",
              }}
            >
              {tlds.map((item) => (
                <ToggleButton
                  key={item}
                  variant="primary"
                  onClick={() => setTld(item)}
                  checked={tld === item}
                  type="radio"
                >
                  .{item.toUpperCase()}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <InputGroup className="mb-3">
              <Form.Control
                style={{ color: darkmode ? "black" : "white" }}
                placeholder="Enter domain name"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
                autoFocus
              />
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </InputGroup>
            {loading && (
              <div style={{ color: darkmode ? "black" : "white" }}>
                Searching...
              </div>
            )}
            {error && (
              <div style={{ color: "red" }}>
                {error}
              </div>
            )}
            {result && (
              <div style={{ color: darkmode ? "black" : "white" }}>
                <h4>Results for {domain}.{tld}</h4>
                <p>First appeared: {result.earliest_date}</p>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FirstAppearance; 