import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { SearchResult } from "../types";
import { json } from "react-router-dom";

type Props = {
  price: number;
};

function Market(props: Props) {
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
      <SearchBar onSelectResult={onSelectResult} />
      <div>
        {stock &&
          stock.map((cum: any, index: any) => (
            <p key={index}>
              {cum["Date"].split("T")[0] + " -> " + cum["Open"]}
            </p>
          ))}
      </div>
    </>
  );
}

export default Market;
