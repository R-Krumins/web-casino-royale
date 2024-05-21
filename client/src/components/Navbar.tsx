import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSocketContext } from "../context";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {
  const [date, setDate] = useState("0000-00-00");
  const [simSpeed, setSimSpeed] = useState(0);
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const socket = useSocketContext();

  const handLogout = () => {
    logout();
  };

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
    <nav className="navbar">
      <h1 className="site-title ">Casino Royale</h1>

      {/* TODO: move this to its own component */}
      {user && (
        <>
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

          <div>
            <Link to="/portfolio">Portfolio</Link>
            <Link to="/market">Market</Link>
          </div>
        </>
      )}

      {user && (
        <div>
          <p>{user.username}</p>
          <button onClick={handLogout}>log out</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
