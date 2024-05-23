/// <reference types="vite-plugin-svgr/client" />

import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import LogoutIcon from "../assets/logout.svg?react";
import TimeControl from "./TimeControl";
import WebsiteTitle from "./WebsiteTitle";
import "../css/navbar.css";
import { useState } from "react";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handLogout = () => {
    logout();
  };

  return (
    <nav id="navbar">
      <WebsiteTitle />

      <TimeControl />

      <div id="navbar-left-div">
        <Link to="portfolio">Portfolio</Link>
        <Link to="market">Market</Link>

        <div id="signin-user-div">
          <p>{user.username}</p>

          <LogoutIcon id="signout-btn" onClick={handLogout} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
