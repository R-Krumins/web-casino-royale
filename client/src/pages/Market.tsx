import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { SearchResult } from "../types";
import "../css/market.css";

function Market() {
  const [stock, setStock] = useState<object[]>();

  const onSelectResult = async (result: SearchResult) => {
    try {
      const response = await fetch(`/api/stocks/${result.item.symbol}`);
      const data = await response.json();
      setStock(data["data"]);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  return (
    <>
      <h1>Market</h1>
      <div id="market-search-div">
        <SearchBar />
      </div>

      <div id="market-search-results"></div>
    </>
  );
}

export default Market;
