/// <reference types="vite-plugin-svgr/client" />

import { useEffect, useState } from "react";
import { useSocketContext } from "../hooks/useSocketContext";
import "../css/timeControl.css";
import PauseIcon from "../assets/pause-circle.svg?react";
import PlayIcon from "../assets/play-circle.svg?react";

function TimeControl() {
  const [date, setDate] = useState("0000-00-00");
  const [simSpeed, setSimSpeed] = useState(0);
  const socket = useSocketContext();

  const handleChangeSimSpeed = (newSpeed: number) => {
    if (newSpeed === simSpeed) return;
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

      <PauseIcon
        className={simSpeed === 0 ? "active" : "inactive"}
        onClick={() => handleChangeSimSpeed(0)}
      />

      <PlayIcon
        className={simSpeed === 1 ? "active" : "inactive"}
        onClick={() => handleChangeSimSpeed(1)}
      />
    </div>
  );
}

export default TimeControl;
