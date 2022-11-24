import { useState } from "react";
import SearchResults from "../components/SearchResults";

function Search() {
  const [query, setQuery] = useState("");
  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <SearchResults search={query} tld="se" />
    </div>
  );
}

export default Search;
