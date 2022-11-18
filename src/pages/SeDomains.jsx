import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: process.env.REACT_APP_AUTHORIZATION,
  },
};

function SeDomains() {
  const { param } = useParams();
  const [page, setPage] = useState(0);
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    axios.get(URL + `/se/${param}/${page}`, CONFIG).then((response) => {
      setDomains(response.data);
    });
  }, []);  

  return (
    <div>
      <h1>the param is {param}</h1>
      <h1>.SE</h1>
      <Container>
        <ul>
          {domains.map((item) => {
            return (
              <li key={item.domain}>
                <p>{item.domain}</p>
              </li>             
            );
          })}
        </ul>
      </Container>
    </div>
  );
}

export default SeDomains