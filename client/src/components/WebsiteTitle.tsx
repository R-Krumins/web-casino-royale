/// <reference types="vite-plugin-svgr/client" />

import CrownLogo from "../assets/crown.svg?react";
import { Link } from "react-router-dom";

function WebsiteTitle() {
  return (
    <div id="website-title">
      <Link to="/">
        <CrownLogo id="crown-logo" />
        <h1>Casino Royale</h1>
      </Link>
    </div>
  );
}

export default WebsiteTitle;
