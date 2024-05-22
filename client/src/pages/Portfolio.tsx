import React, { useEffect, useState } from "react";
import { useSocketContext } from "../context";
import { PortfolioItem } from "../types";
import ItemListing from "../components/ItemListing";
import Navbar from "../components/Navbar";

function Portfolio() {
  const [portfolioItems, setPortfolioItem] = useState<PortfolioItem[]>([]);
  const [value, setValue] = useState(0); //value of player's porftolio
  const socket = useSocketContext();

  useEffect(() => {
    socket.on("update", (data: any) => {
      const update: PortfolioItem[] = data.update;
      if (update.every((item) => item === null)) return;

      console.log(update);
      setPortfolioItem(update);

      setValue(
        update.reduce((sum, item) => {
          return sum + item.data[0].open;
        }, 0)
      );
    });
  }, [socket]);
  return (
    <>
      <Navbar />
      <div className="portfolio-page-body">
        <div className="stats">
          <h1>Portfolio</h1>
          <h3>Value: ${value.toFixed(2)}</h3>
          <h3>Liquidity: $0</h3>
        </div>
        <ul className="portfolio-list">
          {portfolioItems?.map((item, index) => (
            <ItemListing
              key={index}
              item={item._id}
              price={item.data[0].open.toFixed(2)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default Portfolio;
