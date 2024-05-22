import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { SearchResult } from "../types";
import { json } from "react-router-dom";
import Navbar from "../components/Navbar";

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
      <Navbar />
      <div>
        <SearchBar onSelectResult={onSelectResult} />
        <div>
          {stock &&
            stock.map((cum: any, index: any) => (
              <p key={index}>
                {cum["date"].split("T")[0] + " -> " + cum["open"]}
              </p>
            ))}
        </div>
      </div>
    </>
  );
}

export default Market;
