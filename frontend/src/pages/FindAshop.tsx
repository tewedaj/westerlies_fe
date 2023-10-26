import { useEffect } from "react";
import Footer from "../components/Footer";
import img from "../assets/footer1.png";
import "./FindAshop.css";
import FASheader from "../components/FASheader";

const FindAshop = () => {
  useEffect(() => {
    const resultContainer: HTMLElement | null =
      document.querySelector(".result-container");
    const map: HTMLElement | null = document.getElementById("map");

    if (resultContainer && map) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const containerTop = resultContainer.offsetTop;
        const containerHeight = resultContainer.offsetHeight;
        const mapHeight = map.offsetHeight;

        if (
          scrollY >= containerTop &&
          scrollY + mapHeight <= containerTop + containerHeight
        ) {
          map.classList.add("sticky-map");
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <>
      <FASheader />
      <div className="title">
        <h1>Find a Shop &nbsp;&nbsp;|</h1>
        <h1>&nbsp;&nbsp;Washington D.C</h1>
      </div>
      <div className="filter-navbar">
        <h2>FILTER BY:</h2>
        <a>PRODUCT</a>
        <a>SOCIAL IMPACT</a>
        <a>OFFERS CLASSES</a>
      </div>
      <div className="container-fas">
        <div className="results">
          <div className="result-container">
            <div className="result">
              <img src={img} alt="Shop 1" />
              <h3>Shop Name</h3>
              <p>Primary tag | secondary</p>
            </div>
            {/* Add more result items here */}
            <div className="result">
              <img src={img} alt="Shop 1" />
              <h3>Shop Name</h3>
              <p>Primary tag | secondary</p>
            </div>
            <div className="result">
              <img src={img} alt="Shop 1" />
              <h3>Shop Name</h3>
              <p>Primary tag | secondary</p>
            </div>
            <div className="result">
              <img src={img} alt="Shop 1" />
              <h3>Shop Name</h3>
              <p>Primary tag | secondary</p>
            </div>
            <div className="result">
              <img src={img} alt="Shop 1" />
              <h3>Shop Name</h3>
              <p>Primary tag | secondary</p>
            </div>
            <div className="result">
              <img src={img} alt="Shop 1" />
              <h3>Shop Name</h3>
              <p>Primary tag | secondary</p>
            </div>
            <div className="result">
              <img src={img} alt="Shop 1" />
              <h3>Shop Name</h3>
              <p>Primary tag | secondary</p>
            </div>
            <div className="result">
              <img src={img} alt="Shop 1" />
              <h3>Shop Name</h3>
              <p>Primary tag | secondary</p>
            </div>
            <div className="result">
              <img src={img} alt="Shop 1" />
              <h3>Shop Name</h3>
              <p>Primary tag | secondary</p>
            </div>
            <div className="result">
              <img src={img} alt="Shop 1" />
              <h3>Shop Name</h3>
              <p>Primary tag | secondary</p>
            </div>
            <div className="result">
              <img src={img} alt="Shop 1" />
              <h3>Shop Name</h3>
              <p>Primary tag | secondary</p>
            </div>
            <div className="result">
              <img src={img} alt="Shop 1" />
              <h3>Shop Name</h3>
              <p>Primary tag | secondary</p>
            </div>
          </div>

          <div className="pagination">Page 1 of 2</div>
        </div>

        <div id="map">
          <img src={img} alt="Map" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FindAshop;
