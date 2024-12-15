import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { AiOutlineArrowUp } from "react-icons/ai";
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
import { TbSquareArrowUpFilled } from "react-icons/tb";
import PageHeader from "../components/PageHeader";
import ScrollToTop from "../components/ScrollToTop";

const URL = import.meta.env.VITE_BACKEND_URL;
const CONFIG = {
  headers: {
    "Content-Type": "application/json",
    Authorization: import.meta.env.VITE_AUTHORIZATION,
  },
};

function Dates(props) {
  const [page, setPage] = useState(0);
  const [dates, setDates] = useState([]);
  const [pagefull, setPagefull] = useState(false);
  const { darkmode, isMobile } = useDefaultProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const bottom = useCallback(() => {
    if (isLoading || pagefull) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 800) {
      setIsLoading(true);
      setPage((prev) => prev + 1);
    }
  }, [isLoading, pagefull]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const toggleVisibility = () => {
    if (window.scrollY > 300 && !pagefull) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(URL + `/${props.tld}/0`, CONFIG)
      .then((response) => {
        if (response.data == null) {
          setPagefull(true);
        } else {
          setDates(response.data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.tld]);

  useEffect(() => {
    if (page === 0) return;

    setIsLoading(true);
    axios
      .get(URL + `/${props.tld}/${page}`, CONFIG)
      .then((response) => {
        if (response.data == null) {
          setPagefull(true);
        } else {
          setDates((prev) => [...prev, ...response.data]);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [props.tld, page]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        bottom();
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [bottom]);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [pagefull]);

  return (
    <div>
      <PageHeader
        title={`New .${props.tld.toUpperCase()} Domains`}
        breadcrumbs={[
          { text: "Home", link: "/" },
          { text: props.tld.toUpperCase(), active: true }
        ]}
        darkmode={darkmode}
      />
      
      <Container>
        <Row className="justify-content-md-center">
          <Col xl="8" sm>
            <div className="table-container">
              <Table striped bordered variant={darkmode ? "light" : "dark"}>
                <thead>
                  <tr>
                    <th>Domain Name</th>
                    <th>Domain Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {dates.map((item) => {
                    return (
                      <tr key={item.date}>
                        <td key={item.date}>{item.date}</td>
                        <td key={item.amount}>{item.amount}</td>
                        <td>
                          <Link to={`/${props.tld}/${item.date}`}>
                            <MdOutlineDns size={30} />
                            &nbsp;{isMobile ? "View" : "Click to View Domains"}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
            
            <div className="page-controls">
              {pagefull ? (
                <Button variant="success" onClick={scrollToTop}>
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
            
            <ScrollToTop isVisible={isVisible} onClick={scrollToTop} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

Dates.propTypes = {
  tld: PropTypes.string.isRequired,
};

export default Dates;
