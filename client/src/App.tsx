import Portfolio from "./pages/Portfolio";
import Market from "./pages/Market";
import { Routes, Route, Navigate } from "react-router-dom";
import * as io from "socket.io-client";
import { useEffect, useState } from "react";
import { SocketContext } from "./context";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";

const socket = io.connect("http://localhost:3000");

function App() {
  const { user } = useAuthContext();
  // useEffect(() => {
  //   socket.emit("init");
  // }, []);

  return (
    <>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/portfolio" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/portfolio" />}
          />
          <Route
            path="/portfolio"
            element={user ? <Portfolio /> : <Navigate to="/" />}
          />
          <Route
            path="/market"
            element={user ? <Market /> : <Navigate to="/" />}
          />
        </Routes>
      </SocketContext.Provider>
    </>
  );
}

export default App;
