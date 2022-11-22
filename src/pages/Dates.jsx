import { useState, useEffect } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineDns } from "react-icons/md";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useDefaultProvider } from "../contexts/default";

const URL = process.env.REACT_APP_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: process.env.REACT_APP_AUTHORIZATION,
  },
};

function Dates(props) {
  const [page, setPage] = useState(0);
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagefull, setPagefull] = useState(false);
  const { darkmode } = useDefaultProvider();

  function bottom() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight; //document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
    }
    setLoading(true);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }

  useEffect(() => {
    axios.get(URL + `/${props.tld}/${page}`, CONFIG).then((response) => {
      setLoading(false);
      if (response.data.length === 0) {
        setPagefull(true);
        return;
      }
      setDates(dates.concat(response.data));
    });
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", bottom);
    return () => window.removeEventListener("scroll", bottom);
  }, [dates]);

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
                New .{props.tld.toUpperCase()} Domains
              </h2>
            </div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={"/"}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>
                {props.tld.toUpperCase()}
              </Breadcrumb.Item>
            </Breadcrumb>
            <Table striped bordered variant={darkmode ? "light" : "dark"}>
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
                      <td key={item.data}>{item.date}</td>
                      <td key={item.amount}>{item.amount}</td>
                      <td>
                        <Link to={`/${props.tld}/${item.date}`}>
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
                flexDirection: "column-reverse",
              }}
            >
              {loading ? (
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
              ) : (
                <Button onClick={() => bottom()} variant="primary" size="sm">
                  <AiOutlineArrowDown /> Next Page
                </Button>
              )}
              {pagefull ? (
                <Button
                  style={{ marginBottom: "20px" }}
                  variant="success"
                  onClick={scrollToTop}
                >
                  <AiOutlineArrowUp /> Back to top
                </Button>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Dates;
