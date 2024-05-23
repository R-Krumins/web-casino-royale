import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Market from "./pages/Market";
import Portfolio from "./pages/Portfolio";

function App() {
  const { user } = useAuthContext();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/play/portfolio" />}
        />

        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/play/portfolio" />}
        />

        <Route path="/play" element={user ? <Play /> : <Navigate to="/" />}>
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="market" element={<Market />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
