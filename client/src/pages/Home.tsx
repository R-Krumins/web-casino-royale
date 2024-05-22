/// <reference types="vite-plugin-svgr/client" />

import React from "react";
import CrownLogo from "../assets/crown.svg?react";
import SearchIcon from "../assets/search.svg?react";
import "../home.css";

function Home() {
  return (
    <div id="home-page">
      <div id="bg-overlay"></div>
      <div id="home-content">
        <div id="title-div">
          <CrownLogo id="crown-logo" />
          <h1>Casino Royale</h1>
        </div>

        <div id="top-bar">
          <div id="home-options">
            <SearchIcon id="search-icon" />
            <input
              type="text"
              id="home-search"
              placeholder="search stock db..."
            />
            <button id="home-login-btn">Log In</button>
            <button id="home-singup-btn">Sign Up</button>
          </div>
        </div>

        <div id="quote-div">
          <p id="quote">
            “Thousands of experts study overbought indicators, head-and-shoulder
            patterns, put-call ratios, the Fed’s policy on money supply…and they
            can’t predict markets with any useful consistency, any more than the
            gizzard squeezers could tell the Roman emperors when the Huns would
            attack.”
          </p>
          <p id="author">Peter Lynch</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
