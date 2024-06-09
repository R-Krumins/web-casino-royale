import { useState } from "react";
import SearchBar from "../components/SearchBar";
import "../css/market.css";
import StockChart from "../components/StockChart";
import Order from "../components/Order";
import { StockInfo } from "../types";

function Market() {
  const [item, setItem] = useState<StockInfo | null>(null);

  const handleResultSelected = async (symbol: string, name: string) => {
    const res = await fetch(`/api/stocks/info/${symbol}`);

    if (!res.ok) {
      console.log("Stock search failed!");
      return;
    }

    const json = await res.json();
    console.log(json);
    setItem(json.data);
  };

  console.log("RENDER");

  return (
    <>
      <h1>Market</h1>
      <div id="market-search-div">
        <SearchBar onResultSelected={handleResultSelected} />
      </div>
      <hr />

      {!item ? (
        <p>No stock selected. Search the market to show info.</p>
      ) : (
        <>
          <div id="market-stock-info">
            <div id="top-div">
              {item.logo && <img id="item-logo" src={item.logo} alt="logo" />}
              <div>
                <h1>{item.name ? item.name : "No name"}</h1>
                <p>{item._id}</p>
              </div>
              <Order type="Buy" stockSymbol={item._id} />
              <Order type="Sell" stockSymbol={item._id} />
            </div>
            <p>
              <strong>Industry: </strong>
              {item.industry ? item.industry : "None"}
            </p>
            <p>
              <strong>Went Public: </strong>
              {item.wentPublic
                ? new Date(item.wentPublic).toDateString()
                : "No info"}
            </p>
            <p id="market-stock-desc">
              {item.desc ? item.desc : "No description"}
            </p>
          </div>
          <StockChart
            symbol={item._id}
            fromDate="1990-01-01"
            toDate="2020-12-30"
          />
        </>
      )}
    </>
  );
}

export default Market;
