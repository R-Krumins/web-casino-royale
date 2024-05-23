import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { SocketContextProvider } from "../context/SocketContext";

function Play() {
  return (
    <SocketContextProvider>
      <div id="play-container">
        <Navbar />
        <div id="subpage-container">
          <Outlet />
        </div>
      </div>
    </SocketContextProvider>
  );
}

export default Play;
