import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineArrowUp } from "react-icons/ai";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useDefaultProvider } from "../contexts/default";

const URL = process.env.REACT_APP_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: process.env.REACT_APP_AUTHORIZATION,
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
          //if (response.data === null) setEmpty(true)
          if (response.data.length === 0 || response.data === null) return setEmpty(true)
          return setSearchResult(response.data);
        });
      setLoading(false);
    }, 500);

    return () => clearTimeout(wait);
  }, [props.search, props.tld]);

  return (
    <div>
      {loading ? (
        <h1>
          <Spinner animation="border" variant="primary" />
        </h1>
      ) : (
        <Table striped bordered variant={darkmode ? "light" : "dark"}>
          <thead>
            <tr>
              <th>Domain</th>
            </tr>
          </thead>
          <tbody>
            {searchResult.length === 0 ? (
              <Spinner animation="border" variant="primary" />
            ) : empty ? (
              <h5 style={{ color: darkmode ? "black" : "white" }}>
                No results found
              </h5>
            ) : (
              searchResult.map((item) => {
                return (
                  <tr key={item.domain}>
                    <td>{item.domain}</td>
                  </tr>
                );
              })
            )}
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
