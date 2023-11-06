import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import img from "../../assets/footer1.png";
import "./FindAshop.css";
import FASheader from "../../components/shaders/FASheader";
import { useParams } from "react-router-dom";
import { discoverNow } from "../home/controller.home";
import Shope from "../../components/shope/shope";
import Filterlist from "../../components/findashop/Filterlist";

const FindAshop = () => {
  const param: any = useParams();
  const [city, setCity] = useState(param?.city);
  const [shopList, setShopList] = useState<any[]>([]);

  useEffect(() => {
    // get item list from here and set it to shopList
    console.log("city: ", city);
    discoverNow(city).then((res: any) => {
      console.log("RES: ", res);
      setShopList(res.data);
    });
  }, []);

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
          <h1>&nbsp;&nbsp;{city ? city : "No City selected"}</h1>
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
          <a
            onClick={() => {
              setShowFilter(!showFilter);
              setSelectedFilter("Social Impact");
            }}
          >
            SOCIAL IMPACT
          </a>
          <a
            onClick={() => {
              setShowFilter(!showFilter);
              setSelectedFilter("Offers Classes");
            }}
          >
            OFFERS CLASSES
          </a>
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
              {shopList.length > 0 &&
                shopList?.map((shop: any) => {
                  return (
                    <Shope
                      name={shop.name}
                      image={shop.profilePicture?.replace(
                        "api.westerlies.io",
                        "apibeta.westerlies.com"
                      )}
                      primaryKey={shop.primaryKey}
                      address={""}
                      phone={""}
                      email={""}
                      status={0}
                    />
                  );
                })}
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
