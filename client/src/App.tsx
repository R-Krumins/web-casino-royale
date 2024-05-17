import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import Market from "./pages/Market";
import { Routes, Route } from "react-router-dom";
import * as io from "socket.io-client";
import { useEffect, useState } from "react";
import { SocketContext } from "./context";

const socket = io.connect("http://localhost:3000");

function App() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    socket.emit("init");
  }, []);

  return (
    <>
      <SocketContext.Provider value={socket}>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/market" element={<Market price={count} />} />
          </Routes>
        </div>
      </SocketContext.Provider>
    </>
  );
}

export default App;
