/// <reference types="vite-plugin-svgr/client" />

import React, { useEffect, useState } from "react";
import { useSocketContext } from "../context";
import "../css/timeControl.css";
import PauseIcon from "../assets/pause-circle.svg?react";
import PlayIcon from "../assets/play-circle.svg?react";

function TimeControl() {
  const [date, setDate] = useState("0000-00-00");
  const [simSpeed, setSimSpeed] = useState(0);
  const socket = useSocketContext();

  const handleChangeSimSpeed = (newSpeed: number) => {
    socket.emit("change-speed", newSpeed);
    setSimSpeed(newSpeed);
  };

  useEffect(() => {
    socket.on("update", (data: any) => {
      setDate(data.date);
    });
  }, [socket]);
  return (
    <div id="time-control">
      <h1>{date}</h1>
      <button
        className={simSpeed === 0 ? "active" : "inactive"}
        onClick={() => handleChangeSimSpeed(0)}
      >
        <PauseIcon />
      </button>
      <button
        className={simSpeed === 1 ? "active" : "inactive"}
        onClick={() => handleChangeSimSpeed(1)}
      >
        <PlayIcon />
      </button>
    </div>
  );
}

export default TimeControl;
