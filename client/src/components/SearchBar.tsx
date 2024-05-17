import React, { useState } from "react";
import { SearchResult } from "../types";

type Props = {
  onSelectResult: (result: SearchResult) => void;
};

function SearchBar(props: Props) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>();
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  const handleSearch = async (query: string) => {
    try {
      setIsSearching(true);
      const response = await fetch(`/api/stocks/search?q=${query}`);
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div>
      <input
        className="search-bar"
        type="text"
        placeholder="Search..."
        onChange={handleChange}
      />
      {isSearching && <p>Searching...</p>}
      <ul>
        {searchResults &&
          searchResults.map((sr, index) => (
            <li key={index} onClick={() => props.onSelectResult(sr)}>
              <p>
                <strong>{sr.item.symbol}</strong> {sr.item.name}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchBar;
