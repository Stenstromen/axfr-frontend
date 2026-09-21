import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { AiOutlineArrowUp } from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineDns } from "react-icons/md";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useDefaultProvider } from "../contexts/default";
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
  const { isMobile } = useDefaultProvider();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastLoadTime, setLastLoadTime] = useState(0);

  const bottom = useCallback(() => {
    if (isLoading || pagefull) return;

    const now = Date.now();
    if (now - lastLoadTime < 100) return;

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 800) {
      setIsLoading(true);
      setPage((prev) => prev + 1);
    }
  }, [isLoading, pagefull, lastLoadTime]);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetch(`${URL}/${props.tld}/0`, CONFIG).then((response) => {
      response
        .json()
        .then((data) => {
          if (data == null) {
            setPagefull(true);
          } else {
            setDates(data);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, [props.tld]);

  useEffect(() => {
    if (page === 0) return;

    setIsLoading(true);

    fetch(`${URL}/${props.tld}/${page}`, CONFIG).then((response) => {
      response
        .json()
        .then((data) => {
          if (data == null) {
            setPagefull(true);
          } else {
            setDates((prev) => [...prev, ...data]);
          }
        })
        .finally(() => {
          setIsLoading(false);
          setLastLoadTime(Date.now());
        });
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
  }, []);

  return (
    <div>
      <PageHeader
        title={`New .${props.tld.toUpperCase()} Domains`}
        breadcrumbs={[
          { text: "Home", link: "/" },
          { text: props.tld.toUpperCase(), active: true },
        ]}
      />

      <div className="table-container">
        <Table className="axfr-table" hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Domains</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dates.map((item) => {
              return (
                <tr key={item.date}>
                  <td>{item.date}</td>
                  <td>
                    <span className="count-pill">{item.amount}</span>
                  </td>
                  <td>
                    <Link className="view-link" to={`/${props.tld}/${item.date}`}>
                      <MdOutlineDns size={18} />
                      {isMobile ? "View" : "Click to View Domains"}
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
    </div>
  );
}

Dates.propTypes = {
  tld: PropTypes.string.isRequired,
};

export default Dates;
