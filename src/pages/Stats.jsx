import React, { useEffect, useState } from "react";
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
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

function formatDate(tickItem, period) {
  const date = new Date(tickItem);

  if (period.days === "*" || period.days >= 365) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  } else if (period.days >= 31) {
    return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  } else {
    return `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }
}

function formatLargeNumber(tickItem) {
  if (tickItem >= 1000000) {
    return `${(tickItem / 1000000).toFixed(1)}M`;
  } else if (tickItem >= 1000) {
    return `${(tickItem / 1000).toFixed(1)}K`;
  }
  return tickItem;
}

const COMPARISON_PERIODS = {
  ALL_TIME: { days: "*", label: "All" },
  DAY: { days: 2, label: "1-2d" },
  WEEK: { days: 7, label: "7d" },
  MONTH: { days: 31, label: "31d" },
  ONE_YEAR: { days: 365, label: "1y" },
  TWO_YEARS: { days: 730, label: "2y" },
};

function Stats() {
  const { darkmode, isMobile } = useDefaultProvider();
  const URL = import.meta.env.VITE_BACKEND_URL;
  const CONFIG = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: import.meta.env.VITE_AUTHORIZATION,
    },
  };

  const tlds = ["se", "nu", "ch", "li", "ee", "sk"];
  const [tld, setTld] = useState("");
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [comparisonPeriod, setComparisonPeriod] = useState(
    COMPARISON_PERIODS.ALL_TIME,
  );

  useEffect(() => {
    setTld("se");
  }, []);

  useEffect(() => {
    if (tld) {
      setLoading(true);
      fetch(`${URL}/stats/${tld}`, CONFIG).then((response) => {
        response.json().then((data) => {
          const filteredStats = data.filter((stat) => stat.amount > 0);
          setStats(filteredStats);
          setLoading(false);
        });
      });
    }
  }, [tld]);

  const getTrend = () => {
    if (stats.length < 2) return null;

    const lastMetric = stats[stats.length - 1].amount;
    const previousIndex =
      comparisonPeriod.days === "*"
        ? 0
        : Math.max(stats.length - comparisonPeriod.days, 0);
    const previousMetric = stats[previousIndex].amount;
    const difference = lastMetric - previousMetric;

    if (difference === 0) return null;

    const percentageChange = (Math.abs(difference) / previousMetric) * 100;
    const formattedPercentage =
      percentageChange < 1
        ? percentageChange.toFixed(3)
        : percentageChange.toFixed(1);

    return {
      direction: difference > 0,
      difference: Math.abs(difference),
      percentage: formattedPercentage,
      comparedTo: stats[previousIndex].date,
    };
  };

  const isComparisonPeriodAvailable = (periodDays) => {
    if (!stats.length) return false;
    if (periodDays === "*") return true;

    const firstDate = new Date(stats[0].date);
    const lastDate = new Date(stats[stats.length - 1].date);
    const daysDifference = Math.ceil(
      (lastDate - firstDate) / (1000 * 60 * 60 * 24),
    );

    return daysDifference >= periodDays;
  };

  const getFilteredStats = () => {
    if (comparisonPeriod.days === "*" || !stats.length) return stats;

    const startIndex = Math.max(stats.length - comparisonPeriod.days, 0);
    return stats.slice(startIndex);
  };

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
              <h2
                style={{
                  color: darkmode ? "black" : "white",
                  fontSize: isMobile ? "1.5rem" : "2rem",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
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
                display: "flex",
                flexWrap: isMobile ? "wrap" : "nowrap",
                gap: isMobile ? "5px" : "0",
              }}
            >
              {tlds.map((item) => (
                <ToggleButton
                  key={item}
                  variant="primary"
                  onClick={() => setTld(item)}
                  checked={tld === item}
                  type="radio"
                  style={{
                    flex: isMobile ? "1 0 30%" : "1",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  .{item.toUpperCase()}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <ButtonGroup
              style={{
                width: "100%",
                paddingBottom: "10px",
                marginTop: "10px",
                display: "flex",
                flexWrap: isMobile ? "wrap" : "nowrap",
                gap: isMobile ? "5px" : "0",
              }}
            >
              {Object.values(COMPARISON_PERIODS).map((period) => (
                <ToggleButton
                  key={period.label}
                  variant="outline-primary"
                  onClick={() => setComparisonPeriod(period)}
                  checked={comparisonPeriod.days === period.days}
                  disabled={!isComparisonPeriodAvailable(period.days)}
                  type="radio"
                  style={{
                    flex: isMobile ? "1 0 45%" : "1",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  {period.label}
                </ToggleButton>
              ))}
            </ButtonGroup>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: isMobile ? "10px 0" : "20px 0",
              }}
            >
              {loading ? (
                <h1>
                  <Spinner animation="border" variant="primary" />
                </h1>
              ) : (
                <p
                  style={{
                    color: darkmode ? "black" : "white",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                    textAlign: "center",
                    margin: isMobile ? "0.5rem 0" : "1rem 0",
                    wordBreak: "break-word",
                  }}
                >
                  Epoch {stats[0]?.date} - Last Metric{" "}
                  {stats.length > 0 && (
                    <>
                      {new Intl.NumberFormat("fr-FR").format(
                        stats[stats.length - 1].amount,
                      )}
                      {getTrend() && (
                        <span
                          style={{
                            color: getTrend().direction ? "#198754" : "#dc3545",
                            marginLeft: "10px",
                            display: isMobile ? "block" : "inline",
                            marginTop: isMobile ? "5px" : "0",
                          }}
                        >
                          {getTrend().direction ? (
                            <AiOutlineArrowUp />
                          ) : (
                            <AiOutlineArrowDown />
                          )}{" "}
                          {new Intl.NumberFormat("fr-FR").format(
                            getTrend().difference,
                          )}{" "}
                          ({getTrend().percentage}%) vs {getTrend().comparedTo}
                        </span>
                      )}
                    </>
                  )}
                </p>
              )}
            </div>
            <AreaChart
              width={isMobile ? window.innerWidth - 15 : 880}
              height={isMobile ? 250 : 300}
              data={getFilteredStats()}
              margin={{
                top: 5,
                right: isMobile ? 10 : 20,
                bottom: 20,
                left: isMobile ? 20 : 30,
              }}
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
                connectNulls={true}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => formatDate(value, comparisonPeriod)}
                interval={comparisonPeriod.days === 2 ? 0 : "preserveStartEnd"}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis tickFormatter={formatLargeNumber} />
              <Tooltip />
            </AreaChart>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Stats;
