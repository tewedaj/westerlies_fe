import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import img from "../../assets/footer1.png";
import "./FindAshop.css";
import FASheader from "../../components/shaders/FASheader";
import Filterlist from "../../components/findashop/Filterlist";

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
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  return (
    <>
      <div className="findashop">
        <FASheader />
        <div className="title">
          <h1>Find a Shop &nbsp;&nbsp;|</h1>
          <h1>&nbsp;&nbsp;Washington D.C</h1>
        </div>
        <div className="filter-navbar">
          <h2>FILTER BY:</h2>
          <a
            onClick={() => {
              setShowFilter(!showFilter);
              setSelectedFilter("Product");
            }}
          >
            PRODUCT
          </a>
          <a onClick={() => setShowFilter(true)}>SOCIAL IMPACT</a>
          <a onClick={() => setShowFilter(true)}>OFFERS CLASSES</a>
        </div>
        <Filterlist
          isOpen={showFilter}
          dataList={[]}
          onChange={() => {
            // todo: update the state of the array
          }}
          callBack={() => {
            setShowFilter(!showFilter);
          }}
          title={selectedFilter}
        />
        <div className="container-fas">
          <div className="results">
            <div className="result-container">
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
              <div className="result">
                <img src={img} alt="Shop 1" />
                <h3>Shop Name</h3>
                <p>Primary tag | secondary</p>
              </div>
            </div>

            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div id="map">
            <img src={img} alt="Map" />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FindAshop;
