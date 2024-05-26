import { useState } from "react";
import SearchBar from "../components/SearchBar";
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

      {!selectedStock
          ? <p>No stock selected. Search the market to show info.</p>
          : <>
              <div id="market-stock-info">
              <div id="top-div">
                <div>
                  <h1>Stock name</h1>
                  <p>STCK</p>
                </div>
                <button>Buy Order</button>
                <button>Sell Order</button>
              </div>
              <p id="market-stock-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis minima velit accusantium earum maxime amet voluptatum quos quibusdam quae voluptatem deleniti quis, sunt alias optio!</p>
              </div>
              <StockChart symbol={selectedStock} fromDate="2018-01-1" toDate="2020-12-30"/>    
            </>
        }
    </>
  );
}

export default Market;
