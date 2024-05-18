import React, { useEffect, useState } from "react";
import { useSocketContext } from "../context";
import { PortfolioItem } from "../types";

function Portfolio() {
  const [portfolioItems, setPortfolioItem] = useState<PortfolioItem[]>([]);
  const socket = useSocketContext();

  useEffect(() => {
    socket.on("update", (data: any) => {
      const update: PortfolioItem[] = data.update;
      if (update.every((item) => item === null)) return;

      // for (let i = 0; i < update.length; i++) {
      //   if (update[i] === null) {
      //     update[i] = portfolioItems[i];
      //   }
      // }

      console.log(update);
      setPortfolioItem(update);
    });
  }, [socket]);
  return (
    <ul>
      {portfolioItems?.map((item, index) => (
        <li key={index}>
          <h3>{item?._id}</h3>
          <p>${item?.data[0].open.toFixed(2)}</p>
        </li>
      ))}
    </ul>
  );
}

export default Portfolio;
