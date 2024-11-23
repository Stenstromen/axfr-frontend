import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import SearchResults from "../components/SearchResults";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDefaultProvider } from "../contexts/default";
import punycode from 'punycode';

function Search({ tlds }) {
  const { darkmode, isMobile } = useDefaultProvider();
  const [tld, setTld] = useState("");
  const [query, setQuery] = useState("");
  const [punycodeQuery, setPunycodeQuery] = useState("");

  const changeTLD = (tld) => {
    setTld(tld);
  };

  // Convert to punycode when query changes
  useEffect(() => {
    try {
      const encoded = punycode.toASCII(query);
      setPunycodeQuery(encoded);
    } catch (error) {
      console.error("Punycode conversion error:", error);
      setPunycodeQuery(query);
    }
  }, [query]);

  useEffect(() => {
    setTld("se");
  }, []);

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
                Domain Search
              </h2>
            </div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={"/"}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Domain Search</Breadcrumb.Item>
            </Breadcrumb>
            <ButtonGroup
              style={{
                width: "100%",
                paddingBottom: "10px",
                display: isMobile ? "none" : null,
              }}
            >
              {tlds.map((item) => {
                return (
                  <ToggleButton
                    key={item}
                    variant="primary"
                    onClick={() => changeTLD(item)}
                    checked={tld === item}
                    type="radio"
                  >
                    .{item.toUpperCase()}
                  </ToggleButton>
                );
              })}
            </ButtonGroup>
            <InputGroup className="mb-3">
              <Form.Control
                style={{ color: darkmode ? "black" : "white" }}
                autoComplete="off"
                spellCheck="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              {query && isMobile ? (
                <Button variant="light" onClick={() => setQuery("")}>
                  <AiOutlineCloseCircle color="black" />
                </Button>
              ) : null}
              <div style={{ display: !isMobile ? "none" : null }}>
                <DropdownButton
                  value={tld}
                  onClick={(e) => changeTLD(e.target.value)}
                  variant="primary"
                  title={tld ? "." + tld.toUpperCase() : "TLD"}
                  id="input-group-dropdown-2"
                  align="end"
                >
                  {tlds.map((item) => {
                    return (
                      <Dropdown.Item
                        key={item}
                        onClick={() => changeTLD(item)}
                        align="end"
                      >
                        .{item.toUpperCase()}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>
              </div>
            </InputGroup>
            {query.length >= 3 ? (
              <SearchResults search={punycodeQuery} tld={tld} />
            ) : (
              <h5 style={{ color: darkmode ? "black" : "white" }}>
                Please enter at least 3 characters to search...
              </h5>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

Search.propTypes = {
  tlds: PropTypes.array.isRequired,
};

export default Search;
