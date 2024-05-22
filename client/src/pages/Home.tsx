/// <reference types="vite-plugin-svgr/client" />

import React, { useState } from "react";
import "../home2.css";
import Crown from "../assets/crown.svg?react";
import FingerPointer from "../assets/pointing-finger.svg?react";

const pointToSignUp = {
  left: "-5%",
  bottom: "20%",
  transform: "rotate(14deg)",
};
const pointToLogin = {
  left: "-5%",
  bottom: "-5%",
  transform: "rotate(-14deg)",
};

function Home() {
  const [pointerPos, setPointerPos] = useState(pointToSignUp);

  const handleMouseOver = (color: string, pointer: any) => {
    setPointerPos(pointer);
    document.documentElement.style.setProperty("--color", color);
  };

  // const handleMouseOut = () => {
  //   document.documentElement.style.setProperty("--color", "#001219");
  //   console.log("CUM");
  // };

  return (
    <div className="home">
      <div className="container">
        <FingerPointer
          style={{ fill: "var(--color)", ...pointerPos }}
          id="pointing-finger"
        />

        <p id="q1">
          “The most important quality for an investor is temperament, not
          intellect.” - Warren Buffet
        </p>

        <div id="title-div">
          <h1 className="title">CASINO </h1>
          <Crown style={{ fill: "var(--color)", width: "7em" }} id="crown" />
          <h1 className="title"> ROYALE</h1>
        </div>

        <hr id="line-break" />
        <h3 className="subtitle">
          Will you be the next Warren Buffet or just another r/wallstreetbets
          member?
        </h3>

        <div id="auth-options">
          <button
            onMouseOver={() => {
              handleMouseOver("#9b2226", pointToSignUp);
            }}
            // onMouseOut={() => handleMouseOut()}
          >
            Sign Up
          </button>

          <p>
            <strong>OR</strong>
          </p>

          <button
            onMouseOver={() => {
              handleMouseOver("#264653", pointToLogin);
            }}
            // onMouseOut={() => handleMouseOut()}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
