import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Play() {
  return (
    <div id="play-container">
      <Navbar />
      <div id="subpage-container">
        <Outlet />
      </div>
    </div>
  );
}

export default Play;
