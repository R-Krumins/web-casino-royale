/// <reference types="vite-plugin-svgr/client" />

import React, { useState } from "react";
import { SearchResult } from "../types";
import SearchIcon from "../assets/search.svg?react";
import "../css/searchbar.css";

const noResults = {
  item: {
    symbol: "",
    name: "No result",
  },
  refIndex: -1,
};

type Props = {
  onResultSelected: (result: string) => {};
}

function SearchBar(props: Props) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>();

  const handleSearch = async (query: string) => {
    const response = await fetch(`/api/stocks/search?q=${query}`);
    const json = await response.json();

    if (response.ok) {
      setSearchResults(json.data.length === 0 ? [noResults] : json.data);
    }
  };

  return (
    <div id="search-bar">
      <SearchIcon id="search-icon" />
      <input
        id="search-input"
        type="text"
        placeholder="search stock db..."
        onChange={(e) => handleSearch(e.target.value)}
        onBlur={() => {
          setSearchResults([]);
        }}
      />
      <ul id="search-dropdown">
        {searchResults &&
          searchResults.map((sr, index) => (
            <li key={index} 
                onMouseDown={() => props.onResultSelected(sr.item.symbol)}
              >
              <p>
                <strong>{sr.item.symbol}</strong> {sr.item.name}
              </p>
              <hr />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default SearchBar;
