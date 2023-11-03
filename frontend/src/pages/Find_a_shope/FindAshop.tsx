import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import img from "../../assets/footer1.png";
import "./FindAshop.css";
import FASheader from "../../components/shaders/FASheader";
import { useParams } from "react-router-dom";
import { discoverNow } from "../home/controller.home";
import Shope from "../../components/shope/shope";

const FindAshop = () => {

  const param:any = useParams();
  const [city, setCity] = useState(param?.city);
  const [shopList, setShopList] = useState<any[]>([]);


  useEffect(() => {
    // get item list from here and set it to shopList
    console.log("city: ",city);
    discoverNow(city).then((res:any) => {
      console.log("RES: ",res)
      setShopList(res.data);
    });

  },[]);



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
        <h1>&nbsp;&nbsp;{city?city:"No City selected"}</h1>
      </div>

      <div className="container-fas">
        <div className="results">
          <div className="filter-navbar">
            <a>FILTER BY:</a>
            <a>PRODUCT</a>
            <a>SOCIAL IMPACT</a>
            <a>OFFERS CLASSES</a>
          </div>

          <div className="result-container">
          
            {shopList.length > 0 && shopList?.map((shop:any) => {
              
              return (
              <Shope name={shop.name} image={shop.profilePicture?.replace("api.westerlies.io","apibeta.westerlies.com") } primaryKey={shop.primaryKey} address={""} phone={""} email={""} status={0} />
              );
            
            })}
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
