import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import FindAshop from "./pages/Find_a_shope/FindAshop";
import ShopPage from "./pages/shopePage/ShopPage";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Find A Shop" element={<FindAshop />} />
          <Route path="/Shop Page" element={<ShopPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
