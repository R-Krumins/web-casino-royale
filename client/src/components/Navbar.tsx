import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSocketContext } from "../context";

function Navbar() {
  const [date, setDate] = useState("");
  const socket = useSocketContext();

  useEffect(() => {
    socket.on("update", (data: any) => {
      setDate(data.date);
    });
  }, [socket]);

  return (
    <nav className="navbar">
      <h1 className="site-title ">Casino Royale</h1>
      <h1>{date}</h1>
      <ul>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/market">Market</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
