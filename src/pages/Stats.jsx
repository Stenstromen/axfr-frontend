import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import { useDefaultProvider } from "../contexts/default";

function Stats() {
  const { darkmode, isMobile } = useDefaultProvider();
  const URL = process.env.REACT_APP_BACKEND_URL;
  const CONFIG = {
    headers: {
      authorization: process.env.REACT_APP_AUTHORIZATION,
    },
  };
  const tlds = ["se", "nu", "ch", "li", "ee", "sk"];
  const [tld, setTld] = useState("");
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTld("se");
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`${URL}/stats/${tld}`, CONFIG).then((response) => {
      setStats(response.data);
      setLoading(false);
    });
  }, [tld]);

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
                flexDirection: "column",
              }}
            >
              <h2 style={{ color: darkmode ? "black" : "white" }}>
                Domain Stats
              </h2>
            </div>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={"/"}>Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item active>Domain Stats</Breadcrumb.Item>
            </Breadcrumb>
            <ButtonGroup
              style={{
                width: "100%",
                paddingBottom: "10px",
              }}
            >
              {tlds.map((item) => {
                return (
                  <ToggleButton
                    key={item}
                    variant="primary"
                    onClick={() => setTld(item)}
                    checked={tld === item}
                    type="radio"
                  >
                    .{item.toUpperCase()}
                  </ToggleButton>
                );
              })}
            </ButtonGroup>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {loading ? (
                <h1>
                  <Spinner animation="border" variant="primary" />
                </h1>
              ) : (
                <p style={{ color: darkmode ? "black" : "white" }}>
                  Epoch {stats[0]?.date} - Last Metric{" "}
                  {stats.length > 0 &&
                    new Intl.NumberFormat("fr-FR").format(
                      stats[stats.length - 1].amount
                    )}
                </p>
              )}
            </div>
            <AreaChart
              width={isMobile ? 400 : 880}
              height={300}
              data={stats}
              margin={{ top: 5, right: 20, bottom: 5, left: 30 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="50%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="99%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
            </AreaChart>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Stats;
