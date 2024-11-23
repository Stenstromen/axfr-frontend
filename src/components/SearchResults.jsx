import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineArrowUp } from "react-icons/ai";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useDefaultProvider } from "../contexts/default";
import punycode from 'punycode';

const URL = import.meta.env.VITE_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: import.meta.env.VITE_AUTHORIZATION,
  },
};

function SearchResults(props) {
  const { darkmode } = useDefaultProvider();
  const [searchResult, setSearchResult] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  useEffect(() => {
    setSearchResult([]);
    setLoading(true);
    const wait = setTimeout(() => {
      axios
        .get(URL + `/search/${props.tld}/${props.search}`, CONFIG)
        .then((response) => {
          if (response.data.length === 0) return;
          return setSearchResult(response.data);
        })
        .catch(() => {
          setEmpty(true);
          console.log("Response data is null");
        });
      setLoading(false);
      setEmpty(false);
    }, 500);

    return () => clearTimeout(wait);
  }, [props.search, props.tld]);

  const formatDomain = (domain) => {
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

  return (
    <div>
      {loading ? (
        <h1>
          <Spinner animation="border" variant="primary" />
        </h1>
      ) : empty ? (
        <h5 style={{ color: darkmode ? "black" : "white" }}>
          No results found
        </h5>
      ) : searchResult.length === 0 ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Table striped bordered variant={darkmode ? "light" : "dark"}>
          <thead>
            <tr>
              <th>Domain</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((item) => {
              return (
                <tr key={item.domain}>
                  <td>{formatDomain(item.domain)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column-reverse",
        }}
      >
        {searchResult.length >= 30 ? (
          <Button
            style={{ marginBottom: "20px" }}
            variant="success"
            onClick={scrollToTop}
          >
            Back to top <AiOutlineArrowUp />
          </Button>
        ) : null}
      </div>
    </div>
  );
}

SearchResults.propTypes = {
  tld: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

export default SearchResults;
