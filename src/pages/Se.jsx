import React from "react"
import { useState, useEffect } from "react";
import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;
const CONFIG = {
    headers: {
        authorization: process.env.REACT_APP_AUTHORIZATION,
    }
}

function Se() {

    const [dates, setDates] = useState([]);

    useEffect(() => {
      axios.get(URL+"/se",CONFIG).then((response) => {
        setDates(response.data);
        console.log(response.data)
      });
    }, []);

    return (
    <div>
      <h1>.SE</h1>
      <p>{dates}</p>
    </div>
  );
}

export default Se;
