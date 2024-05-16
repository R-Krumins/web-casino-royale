import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="site-title ">Casino Royale</h1>
      <ul>
        <Link to="/portfolio">Portfolio</Link>
        <Link to="/market">Market</Link>
      </ul>
    </nav>
  );
}

export default Navbar;
