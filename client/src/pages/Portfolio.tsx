import React, { useEffect, useState } from "react";
import { useSocketContext } from "../context";

function Portfolio() {
  const [count, setCount] = useState<number>(0);

  const socket = useSocketContext();

  useEffect(() => {
    socket.on("update", (data: number) => {
      setCount(data);
    });
  }, [socket]);
  return <div>Portfolio: {count}</div>;
}

export default Portfolio;
