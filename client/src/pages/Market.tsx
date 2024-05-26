import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { SearchResult } from "../types";
import "../css/market.css";
import StockChart from "../components/StockChart";

function Market() {
  const [selectedStock, setSelectedStock] = useState("");

  const handleResultSelected = async (result: string) => {
    console.log(result);
    
    setSelectedStock(result)
  };

  return (
    <>
      <h1>Market</h1>
      
      <div id="market-search-div">
        <SearchBar onResultSelected={handleResultSelected}/>
      </div>

      <hr />
      <StockChart symbol={selectedStock} fromDate="2018-01-1" toDate="2020-12-30"/>
    </>
  );
}

export default Market;
