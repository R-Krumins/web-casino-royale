import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSocketContext } from "../context";

function Navbar() {
  const [date, setDate] = useState("0000-00-00");
  const [simSpeed, setSimSpeed] = useState(0);

  const socket = useSocketContext();

  function handleChangeSimSpeed(newSpeed: number) {
    socket.emit("change-speed", newSpeed);
    setSimSpeed(newSpeed);
  }

  useEffect(() => {
    socket.on("update", (data: any) => {
      setDate(data.date);
    });
  }, [socket]);

  return (
    <nav className="navbar">
      <h1 className="site-title ">Casino Royale</h1>

      <div className="time-ctrl">
        <h1>{date}</h1>
        <button
          className={simSpeed === 0 ? "active" : "inactive"}
          onClick={() => handleChangeSimSpeed(0)}
        >
          <img src="./src/assets/pause-circle.svg" alt="play" />
        </button>
        <button
          className={simSpeed === 1 ? "active" : "inactive"}
          onClick={() => handleChangeSimSpeed(1)}
        >
          <img src="./src/assets/play-circle.svg" alt="play" />
        </button>
      </div>

      <ul>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/market">Market</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
