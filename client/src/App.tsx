import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import Market from "./pages/Market";
import { Routes, Route } from "react-router-dom";
import * as io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3000");

function App() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    socket.emit("init");
  }, []);

  useEffect(() => {
    socket.on("update", (data) => {
      setCount(data);
    });
  }, [socket]);
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/market" element={<Market price={count} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
