import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  HiOutlineMagnifyingGlass,
  HiOutlineChartBar,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";
import { MdOutlineDns } from "react-icons/md";

function Home({ tlds }) {
  const cards = [
    {
      title: "Domain Search",
      text: "Look up newly seen names across Nordic and nearby ccTLDs.",
      link: "/search",
      buttonText: "Search Domains",
      icon: HiOutlineMagnifyingGlass,
      variant: "featured",
      chips: tlds,
    },
    {
      title: "Domain Stats",
      text: "Registration volume over time for .SE, .NU, .CH, .LI, .EE and .SK.",
      link: "/stats",
      buttonText: "View Domain Stats",
      icon: HiOutlineChartBar,
    },
    {
      title: "First Appearance",
      text: ".SE and .NU names that showed up for the first time in these records.",
      link: "/first-appearance",
      buttonText: "View First Appearance",
      icon: HiOutlineSparkles,
    },
    {
      title: "Fresh .SE",
      text: "Newly added and updated .SE domains from yesterday.",
      link: "/se",
      buttonText: "View .SE Domains",
      icon: MdOutlineDns,
    },
    {
      title: "Fresh .NU",
      text: "Newly added and updated .NU domains from yesterday.",
      link: "/nu",
      buttonText: "View .NU Domains",
      icon: HiOutlineGlobeAlt,
    },
  ];

  return (
    <div>
      <section className="hero">
        <p className="hero-kicker">DNS zone observations</p>
        <h1>
          New <span className="grad">.SE / .NU</span>
          <br />
          domains, daily
        </h1>
        <p className="hero-sub">
          A live watch on freshly registered and updated names — search the
          archive, chart the trend, or browse yesterday&apos;s drop.
        </p>
        <div className="hero-actions">
          <Link to="/search" className="btn-glow">
            Search domains
          </Link>
          <Link to="/se" className="btn-ghost">
            Browse .SE
          </Link>
        </div>
      </section>

      <div className="feature-grid">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.link}
              className={`feature-card${card.variant === "featured" ? " featured" : ""}`}
            >
              <div className="feature-icon">
                <Icon size={22} />
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              {card.chips && (
                <div className="tld-chip-row">
                  {card.chips.map((item) => (
                    <span key={item} className="tld-chip">
                      .{item.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
              <Link to={card.link} className="btn btn-primary">
                {card.buttonText}
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}

Home.propTypes = {
  tlds: PropTypes.array.isRequired,
};

export default Home;
