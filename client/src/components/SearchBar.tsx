import React, { useState } from "react";

interface SeachResult {
  item: {
    symbol: string;
    name: string;
  };
  refIndex: number;
  score: number;
}

const SearchBar: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SeachResult[]>();
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
            <li key={index}>
              <p>
                <strong>{sr.item.symbol}</strong> {sr.item.name}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchBar;
