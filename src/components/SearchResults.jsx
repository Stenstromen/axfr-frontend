import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import ScrollToTop from './ScrollToTop';
import punycode from 'punycode';
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: import.meta.env.VITE_AUTHORIZATION,
  },
};

function SearchResults({ tld, query, darkmode }) {
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  const toggleVisibility = () => {
    if (window.scrollY > 300 && searchResult.length >= 30) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [searchResult.length]);

  useEffect(() => {
    let timeoutId;

    if (query.length >= 3) {
      setLoading(true);
      timeoutId = setTimeout(() => {
        axios
          .get(URL + `/search/${tld}/${query}`, CONFIG)
          .then((response) => {
            if (response.data.length === 0) {
              setEmpty(true);
              setSearchResult([]);
            } else {
              setEmpty(false);
              setSearchResult(response.data);
            }
          })
          .catch((error) => {
            console.error("Search error:", error);
            setEmpty(true);
            setSearchResult([]);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 300);
    } else {
      setSearchResult([]);
      setEmpty(false);
      setLoading(false);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [query, tld]);

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

  // Don't show anything if there's no query
  if (!query) return null;

  // Show message if query is too short
  if (query.length < 3) {
    return (
      <h5 style={{ color: darkmode ? "black" : "white", textAlign: 'center' }}>
        Please enter at least 3 characters
      </h5>
    );
  }

  return (
    <div>
      {loading ? (
        <div className="centered-flex" style={{ minHeight: '100px' }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : empty ? (
        <h5 style={{ color: darkmode ? "black" : "white", textAlign: 'center' }}>
          No results found
        </h5>
      ) : searchResult.length > 0 ? (
        <div className="table-container">
          <Table striped bordered variant={darkmode ? "light" : "dark"}>
            <thead>
              <tr>
                <th>Domain ({searchResult.length} found)</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.map((item) => (
                <tr key={item.domain}>
                  <td>{formatDomain(item.domain)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : null}
      
      <ScrollToTop isVisible={isVisible} onClick={scrollToTop} />
    </div>
  );
}

SearchResults.propTypes = {
  tld: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  darkmode: PropTypes.bool.isRequired,
};

export default SearchResults;