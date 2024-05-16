import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import Portfolio from "./pages/Portfolio";
import Market from "./pages/Market";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/market" element={<Market />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
