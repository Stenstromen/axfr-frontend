import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDefaultProvider } from "../contexts/default";
import punycode from "punycode";
import SearchControls from "../components/SearchControls";
import SearchResults from "../components/SearchResults";
import PageHeader from "../components/PageHeader";

function Search({ tlds }) {
  const { isMobile } = useDefaultProvider();
  const [tld, setTld] = useState("se");
  const [query, setQuery] = useState("");
  const [punycodeQuery, setPunycodeQuery] = useState("");

  const changeTLD = (newTld) => {
    setTld(newTld);
  };

  useEffect(() => {
    try {
      const encoded = punycode.toASCII(query.trim());
      setPunycodeQuery(encoded);
    } catch (error) {
      console.error("Punycode conversion error:", error);
      setPunycodeQuery(query.trim());
    }
  }, [query]);

  return (
    <div>
      <PageHeader
        title="Domain Search"
        breadcrumbs={[
          { text: "Home", link: "/" },
          { text: "Domain Search", active: true },
        ]}
      />

      <SearchControls
        isMobile={isMobile}
        tlds={tlds}
        tld={tld}
        query={query}
        onTldChange={changeTLD}
        onQueryChange={setQuery}
        onClearQuery={() => setQuery("")}
      />

      <SearchResults tld={tld} query={punycodeQuery} />
    </div>
  );
}

Search.propTypes = {
  tlds: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Search;
