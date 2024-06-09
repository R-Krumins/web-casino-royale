import { useEffect, useState } from "react";
import { useSocketContext } from "../hooks/useSocketContext";
import { PortfolioItem } from "../types";
import ItemListing from "../components/ItemListing";
import "../css/portfolio.css";

function Portfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [value, setValue] = useState(0); //value of player's porftolio
  const socket = useSocketContext();

  useEffect(() => {
    socket.on("update", (data: any) => {
      let update: PortfolioItem[] = data.update;
      update = update.filter((x) => x !== null);
      if (update.length === 0) return;
      // if (update.every((item) => item === null)) return;

      //console.log(update);
      setPortfolioItems(update);

      setValue(
        update.reduce((sum, item) => {
          return sum + item.close;
        }, 0)
      );
    });
  }, [socket]);

  return (
    <>
      <div className="stats">
        <h1>Portfolio</h1>
        <h3>Value: ${value.toFixed(2)}</h3>
        <h3>Liquidity: $0</h3>
      </div>
      <ul id="portfolio-list">
        {portfolioItems?.map((item, index) => (
          <ItemListing
            key={index}
            item={item.symbol}
            amount={item.amount}
            price={item.close.toFixed(2)}
          />
        ))}
      </ul>
    </>
  );
}

export default Portfolio;
