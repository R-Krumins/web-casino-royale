/// <reference types="vite-plugin-svgr/client" />

import { useState } from "react";
import { useSocketContext } from "../hooks/useSocketContext";
import { useSimContext } from "../hooks/useSimContext";
import "../css/timeControl.css";
import PauseIcon from "../assets/pause-circle.svg?react";
import PlayIcon from "../assets/play-circle.svg?react";

function TimeControl() {
  const { curentDate } = useSimContext();
  const [simSpeed, setSimSpeed] = useState(0);
  const socket = useSocketContext();

  const handleChangeSimSpeed = (newSpeed: number) => {
    if (newSpeed === simSpeed) return;
    socket.emit("change-speed", newSpeed);
    setSimSpeed(newSpeed);
  };
  return (
    <div id="time-control">
      <h1>{curentDate}</h1>

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
