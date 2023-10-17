import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import FindAshop from "./pages/FindAshop";
import ShopPage from "./pages/ShopPage";
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
