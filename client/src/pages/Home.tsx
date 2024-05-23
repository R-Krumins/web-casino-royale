import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import WebsiteTitle from "../components/WebsiteTitle";
import "../css/home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div id="home-page">
      <div id="bg-overlay"></div>
      <div id="home-content">
        <div id="top-bar">
          <WebsiteTitle />

          <div id="home-options">
            <SearchBar />
            <button id="home-login-btn" onClick={() => navigate("/login")}>
              Log In
            </button>
            <button id="home-singup-btn" onClick={() => navigate("/signup")}>
              Sign Up
            </button>
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
