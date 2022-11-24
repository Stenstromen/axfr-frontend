import { useEffect, useState } from "react";
import axios from "axios";
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

  useEffect(() => {
    axios
      .get(URL + `/search/${props.tld}/${props.search}`, CONFIG)
      .then((response) => {
        if (response.data.length === 0) return;
        return setSearchResult(response.data);
      });
  }, [props.search]);

  return (
    <div>
      <h1>lol</h1>
      <table>
        <thead>
          <tr>
            <th>Domain</th>
          </tr>
        </thead>
        <tbody>
          {searchResult.map((item) => {
            <tr>
              <td>{item}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SearchResults;
