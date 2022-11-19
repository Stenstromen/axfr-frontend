import React from "react";
import { useState, useEffect } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import BeatLoader from "react-spinners/BeatLoader";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MdOutlineDns } from "react-icons/md";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: process.env.REACT_APP_AUTHORIZATION,
  },
};

function Nu() {
  const [page, setPage] = useState(0);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagefull, setPagefull] = useState(false);

  function bottom() {
    if (pagefull) return;
    setPage(page + 1);
    setLoading(true);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  useBottomScrollListener(bottom);

  useEffect(() => {
    axios.get(URL + `/nu/${page}`, CONFIG).then((response) => {
      setLoading(false);
      if (response.data.length === 0) {
        setPagefull(true);
        return;
      }
      setDates(dates.concat(response.data));
    });
  }, [page]);

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
              <h2>New .NU Domains</h2>
            </div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={"/"}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>NU</Breadcrumb.Item>
            </Breadcrumb>
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Domain Name</th>
                  <th>Domain Amount</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {dates.map((item) => {
                  return (
                    <tr key={item.date}>
                      <td>{item.date}</td>
                      <td>{item.amount}</td>
                      <td>
                        <Link to={`/nu/${item.date}`}>
                          <MdOutlineDns size={30} />
                        </Link>
                      </td>
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
              {pagefull ? (
                <Button variant="success" onClick={scrollToTop}>
                  Back to top
                </Button>
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Nu;
