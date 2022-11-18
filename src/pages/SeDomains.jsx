import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import BeatLoader from "react-spinners/BeatLoader";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
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
  const [loading, setLoading] = useState(false);
  const [pagefull, setPagefull] = useState(false);
  const [domains, setDomains] = useState([]);

  function bottom() {
    if (pagefull) return;
    setPage(page + 1);
    setLoading(true);
  }

  function scrollToTop() {
    window.scrollTo({
        top: 0, 
        behavior: 'auto'
      });
  }

  useBottomScrollListener(bottom);

  useEffect(() => {
    axios.get(URL + `/se/${param}/${page}`, CONFIG).then((response) => {
      setLoading(false);
      if (response.data.length === 0) {
        setPagefull(true);
        return;
      }
      setDomains(domains.concat(response.data));
    });
  }, [page]);

  return (
    <div>
      <h1>the param is {param}</h1>
      <h1>.SE</h1>
      <Container>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Domain Name</th>
            </tr>
          </thead>
          <tbody>
            {domains.map((item) => {
              return (
                <tr>
                  <td key={item.domain}>{item.domain}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading ? <BeatLoader loading /> : ""}
          {pagefull ? <Button variant="success" onClick={scrollToTop}>Back to top</Button> : ""}
        </div>
      </Container>
    </div>
  );
}

export default SeDomains;
