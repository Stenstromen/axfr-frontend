import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import PageHeader from "../components/PageHeader";

const URL = import.meta.env.VITE_BACKEND_URL;
const CONFIG = {
  headers: {
    authorization: import.meta.env.VITE_AUTHORIZATION,
  },
};

function FirstAppearance() {
  const [tld, setTld] = useState("se");
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const tlds = ["se", "nu"];

  const handleSearch = async () => {
    if (!domain) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      await fetch(`${URL}/${tld}appearance/${domain}.${tld}`, CONFIG).then(
        (response) => {
          response.json().then((data) => {
            setResult(data);
          });
        },
      );
    } catch (err) {
      setError("Domain not found or an error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="First Appearance Search"
        breadcrumbs={[
          { text: "Home", link: "/" },
          { text: "First Appearance (in my records)", active: true },
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
              name="appearance-tld"
              value={item}
              id={`appearance-tld-${item}`}
            >
              .{item.toUpperCase()}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Enter domain name"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          autoFocus
        />
        <Button variant="primary" onClick={handleSearch}>
          Search
        </Button>
      </InputGroup>

      {loading && <p className="status-copy">Searching...</p>}
      {error && <p className="error-copy">{error}</p>}
      {result && (
        <div className="result-card">
          <h4>
            Results for {domain}.{tld}
          </h4>
          <p>First appeared: {result.earliest_date}</p>
        </div>
      )}
    </div>
  );
}

export default FirstAppearance;
