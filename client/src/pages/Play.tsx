import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { SocketContextProvider } from "../context/SocketContext";
import { SimContextProvider } from "../context/SimContext";

function Play() {
  return (
    <SocketContextProvider>
      <SimContextProvider>
        <div id="play-container">
          <Navbar />
          <div id="subpage-container">
            <Outlet />
          </div>
        </div>
      </SimContextProvider>
    </SocketContextProvider>
  );
}

export default Play;
