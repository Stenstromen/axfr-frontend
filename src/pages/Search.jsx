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
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
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
            <ButtonGroup style={{ width: "100%", paddingBottom: "10px", display: isMobile ? "none" : null  }}>
              <ToggleButton
                variant="primary"
                onClick={() => changeTLD("se")}
                checked={tld === "se"}
                type="radio"
              >
                .SE
              </ToggleButton>
              <ToggleButton
                variant="primary"
                onClick={() => changeTLD("nu")}
                checked={tld === "nu"}
                type="radio"
              >
                .NU
              </ToggleButton>
              <ToggleButton
                variant="primary"
                onClick={() => changeTLD("ch")}
                checked={tld === "ch"}
                type="radio"
              >
                .CH
              </ToggleButton>
              <ToggleButton
                variant="primary"
                onClick={() => changeTLD("li")}
                checked={tld === "li"}
                type="radio"
              >
                .LI
              </ToggleButton>
              <ToggleButton
                variant="primary"
                onClick={() => changeTLD("ee")}
                checked={tld === "ee"}
                type="radio"
              >
                .EE
              </ToggleButton>
              <ToggleButton
                variant="primary"
                onClick={() => changeTLD("sk")}
                checked={tld === "sk"}
                type="radio"
              >
                .SK
              </ToggleButton>
            </ButtonGroup>
            <InputGroup className="mb-3">
              <Form.Control
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
                  <Dropdown.Item onClick={() => changeTLD("se")} align="end">
                    .SE
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeTLD("nu")} align="end">
                    .NU
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeTLD("ch")} align="end">
                    .CH
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeTLD("li")} align="end">
                    .LI
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeTLD("ee")} align="end">
                    .EE
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeTLD("sk")} align="end">
                    .SK
                  </Dropdown.Item>
                </DropdownButton>
              </div>
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
