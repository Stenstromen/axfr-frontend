import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import SearchResults from "../components/SearchResults";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDefaultProvider } from "../contexts/default";

function Search() {
  const { darkmode, isMobile } = useDefaultProvider();
  const [tld, setTld] = useState("");
  const [query, setQuery] = useState("");

  const changeTLD = (tld) => {
    setTld(tld);
    setQuery(query);
  };

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
            <InputGroup className="mb-3">
              <Form.Control
                autoComplete="off"
                spellCheck="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && isMobile ? (
                <Button variant="light" onClick={() => setQuery("")}>
                  <AiOutlineCloseCircle color="black" />
                </Button>
              ) : null}
              <DropdownButton
                value={tld}
                onClick={(e) => changeTLD(e.target.value)}
                variant="primary"
                title={tld ? "." + tld.toUpperCase() : "TLD"}
                id="input-group-dropdown-2"
                align="end"
              >
                <Dropdown.Item onClick={() => changeTLD("se")} align="end">
                  .SE
                </Dropdown.Item>
                <Dropdown.Item onClick={() => changeTLD("nu")} align="end">
                  .NU
                </Dropdown.Item>
              </DropdownButton>
            </InputGroup>
            {query.length >= 3 ? (
              <SearchResults search={query} tld={tld} />
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

export default Search;
