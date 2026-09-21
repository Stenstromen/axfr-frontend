import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Spinner from "react-bootstrap/Spinner";
import { useDefaultProvider } from "../contexts/default";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import PageHeader from "../components/PageHeader";

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

  const isLight = darkmode;
  const chartStroke = isLight ? "#3b6ef5" : "#6ea0ff";
  const axisColor = isLight ? "#5b677c" : "#8b96ab";
  const tooltipStyles = {
    backgroundColor: isLight ? "#ffffff" : "#121826",
    border: isLight ? "1px solid rgba(15,23,42,0.08)" : "1px solid rgba(148,163,184,0.12)",
    borderRadius: 12,
    color: isLight ? "#0f172a" : "#eef2f7",
  };

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

  const trend = getTrend();

  return (
    <div>
      <PageHeader
        title="Domain Stats"
        breadcrumbs={[
          { text: "Home", link: "/" },
          { text: "Domain Stats", active: true },
        ]}
      />

      <div className="tld-pills">
        <ButtonGroup>
          {tlds.map((item) => (
            <ToggleButton
              key={item}
              variant="primary"
              onClick={() => setTld(item)}
              checked={tld === item}
              type="radio"
              name="stats-tld"
              value={item}
              id={`stats-tld-${item}`}
              style={{
                flex: isMobile ? "1 0 30%" : "1",
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              .{item.toUpperCase()}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

      <div className="tld-pills">
        <ButtonGroup>
          {Object.values(COMPARISON_PERIODS).map((period) => (
            <ToggleButton
              key={period.label}
              variant="outline-primary"
              onClick={() => setComparisonPeriod(period)}
              checked={comparisonPeriod.days === period.days}
              disabled={!isComparisonPeriodAvailable(period.days)}
              type="radio"
              name="stats-period"
              value={period.label}
              id={`stats-period-${period.label}`}
              style={{
                flex: isMobile ? "1 0 45%" : "1",
                fontSize: isMobile ? "0.9rem" : "1rem",
              }}
            >
              {period.label}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

      <div className="glass-panel">
        <div className="centered-flex" style={{ minHeight: 52 }}>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <p className="stats-meta">
              Epoch {stats[0]?.date} — Last metric{" "}
              {stats.length > 0 && (
                <>
                  {new Intl.NumberFormat("fr-FR").format(
                    stats[stats.length - 1].amount,
                  )}
                  {trend && (
                    <span
                      className={trend.direction ? "trend-up" : "trend-down"}
                      style={{
                        marginLeft: "10px",
                        display: isMobile ? "block" : "inline",
                        marginTop: isMobile ? "5px" : "0",
                      }}
                    >
                      {trend.direction ? (
                        <AiOutlineArrowUp />
                      ) : (
                        <AiOutlineArrowDown />
                      )}{" "}
                      {new Intl.NumberFormat("fr-FR").format(trend.difference)} (
                      {trend.percentage}%) vs {trend.comparedTo}
                    </span>
                  )}
                </>
              )}
            </p>
          )}
        </div>

        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getFilteredStats()}
              margin={{
                top: 8,
                right: isMobile ? 8 : 16,
                bottom: 20,
                left: isMobile ? 0 : 8,
              }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartStroke} stopOpacity={0.45} />
                  <stop offset="100%" stopColor={chartStroke} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="amount"
                stroke={chartStroke}
                strokeWidth={2.2}
                fillOpacity={1}
                fill="url(#colorAmount)"
                connectNulls={true}
              />
              <CartesianGrid stroke="var(--chart-grid)" strokeDasharray="4 8" />
              <XAxis
                dataKey="date"
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={{ stroke: "var(--border)" }}
                tickLine={false}
                tickFormatter={(value) => formatDate(value, comparisonPeriod)}
                interval={comparisonPeriod.days === 2 ? 0 : "preserveStartEnd"}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis
                tick={{ fill: axisColor, fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatLargeNumber}
              />
              <Tooltip
                contentStyle={tooltipStyles}
                labelFormatter={(value) => formatDate(value, comparisonPeriod)}
                formatter={(value) => [
                  new Intl.NumberFormat("fr-FR").format(value),
                  "Domains",
                ]}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Stats;
