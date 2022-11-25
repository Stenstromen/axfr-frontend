import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      axios
        .get(URL + `/search/${props.tld}/${props.search}`, CONFIG)
        .then((response) => {
          if (response.data.length === 0) return;
          return setSearchResult(response.data);
        });
      setLoading(false);
    }, 1500);
  }, [props.search, props.tld]);

  return (
    <div>
      {loading ? (
        <h1><Spinner animation="border" variant="primary" /></h1>
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
                <tr>
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

export default SearchResults;
