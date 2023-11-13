import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import FindAshop from "./pages/Find_a_shope/FindAshop";
import ShopPage from "./pages/shopePage/ShopPage";
import Main from "./pages/Admin/Main";
import Storemgmt from "./pages/Admin/Storemgmt";
import Emailmgmt from "./pages/Admin/Emailmgmt";
import StoreForm from "./components/admincomponents/StoreForm";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Find A Shop" element={<FindAshop />} />
          <Route path="/Find_A_Shop/:country/:city" element={<FindAshop />} />

          <Route path="/Shop Page" element={<ShopPage />} />
          <Route path="/Shop_Page/:id" element={<ShopPage />} />

          <Route path="/Admin" element={<Main />} />
          <Route path="/store mgmt" element={<Storemgmt />} />
          <Route path="/email mgmt" element={<Emailmgmt />} />
          <Route path="/form" element={<StoreForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
