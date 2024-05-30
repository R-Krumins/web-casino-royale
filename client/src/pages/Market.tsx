import { useState } from "react";
import SearchBar from "../components/SearchBar";
import "../css/market.css";
import StockChart from "../components/StockChart";
import Order from "../components/Order";

function Market() {
  const [symbol, setSymbol] = useState("");
  const [name, setName] = useState("");

  const handleResultSelected = async (symbol: string, name: string) => {
    setSymbol(symbol);
    setName(name);
  };

  return (
    <>
      <h1>Market</h1>
      <div id="market-search-div">
        <SearchBar onResultSelected={handleResultSelected} />
      </div>
      <hr />

      {!symbol ? (
        <p>No stock selected. Search the market to show info.</p>
      ) : (
        <>
          <div id="market-stock-info">
            <div id="top-div">
              <div>
                <h1>{name}</h1>
                <p>{symbol}</p>
              </div>
              <Order type="Buy" stockSymbol={symbol} />
              <Order type="Sell" stockSymbol={symbol} />
            </div>
            <p id="market-stock-desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
              minima velit accusantium earum maxime amet voluptatum quos
              quibusdam quae voluptatem deleniti quis, sunt alias optio!
            </p>
          </div>
          <StockChart
            symbol={symbol}
            fromDate="1990-01-01"
            toDate="2020-12-30"
          />
        </>
      )}
    </>
  );
}

export default Market;
