import React from "react";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: process.env.REACT_APP_AUTHORIZATION,
  },
};

function Se() {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    axios.get(URL + "/se", CONFIG).then((response) => {
      setDates(response.data);
    });
  }, []);

  return (
    <div>
      <h1>.SE</h1>
      <Container>
        <ul>
          {dates.map((item) => {
            return (
              <li key={item.date}>
                <Link to={`/se/${item.date}`}>{item.date} {item.amount}</Link>
              </li>             
            );
          })}
        </ul>
      </Container>
    </div>
  );
}

export default Se;
