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
  const [page, setPage] = useState(0);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  function bottom() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
    }
    console.log(page);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  useEffect(() => {
    //setSearchResult([]);
    setLoading(true);
    const wait = setTimeout(() => {
      axios
        .get(URL + `/search/${props.tld}/${props.search}/${page}`, CONFIG)
        .then((response) => {
          if (response.data.length === 0) return;
          return setSearchResult(searchResult.concat(response.data));
        })
        .catch(() => {
          setEmpty(true);
          console.log("Response data is null");
        });
      setLoading(false);
      setEmpty(false);
    }, 500);

    return () => clearTimeout(wait);
  }, [props.search, props.tld, page]);

  useEffect(() => {
    window.addEventListener("scroll", bottom);
    return () => window.removeEventListener("scroll", bottom);
  }, [searchResult]);

  return (
    <div>
      {empty ? (
        <h5 style={{ color: darkmode ? "black" : "white" }}>
          No results found
        </h5>
      ) : (
        <Table striped bordered variant={darkmode ? "light" : "dark"}>
          <thead>
            <tr>
              <th>
                Domain{" "}
                {loading ? (
                  <p>Loading</p>
                ) : searchResult.length === 0 ? (
                  <p>loading</p>
                ) : null}
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResult.map((item) => {
              return (
                <tr key={item.domain}>
                  <td>{item.domain}</td>
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
        {empty ? (
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
    </div>
  );
}

SearchResults.propTypes = {
  tld: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

export default SearchResults;
