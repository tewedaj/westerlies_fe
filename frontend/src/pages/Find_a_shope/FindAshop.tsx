import { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import img from "../../assets/footer1.png";
import "./FindAshop.css";
import FASheader from "../../components/shaders/FASheader";
import { useParams } from "react-router-dom";
import { discoverNow } from "../home/controller.home";
import Shope from "../../components/shope/shope";
import Filterlist from "../../components/findashop/Filterlist";
import GoogleMap from "../../components/mapComponent/mapComponent";

const FindAshop = () => {

  const param:any = useParams();
  const [city, setCity] = useState(param?.city);
  const [country,setCountry] = useState(param?.country);
  const [shopList, setShopList] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);


  useEffect(() => {
    // get item list from here and set it to shopList
    console.log("city: ",city);
    console.log("city: ",country);
    discoverNow(country,city,page).then((res:any) => {
      console.log("RES: ",res)
      setShopList(res.data);
    });

  },[]);

  useEffect(()=>{
    discoverNow(country, city,page).then((res:any) => {
      console.log("RES: ",res)
      setShopList(res.data);
    });
  },[page])


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
        <h1>&nbsp;&nbsp;{city?city:"No City selected"}</h1>
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
      
          {shopList.length > 0 && page >= 0 &&  shopList?.map((shop:any,index) => {
              if(index > page && index <= page+10){
              return (
              <Shope name={shop.name} image={shop.profilePicture?.replace("api.westerlies.io","apibeta.westerlies.com") } primaryKey={shop.primaryKey} address={""} phone={""} email={""} status={0} />
              );
              }
            })}
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item" onClick={()=>{
                  if(page == 0){
                    setPage(0);
                  }else{
                    setPage(page-1);
                  }
                }}>
                  <p className="page-link" href="" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </p>
                </li>
             
                      <li className="page-item">
                        <p className="page-link"   >
                          {page+1}
                        </p>
                      </li>
            
                  <li className="page-item" onClick={()=>{
                    setPage(page+1);
                  }}>
                    <p className="page-link" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </p>
                  </li>

               
              </ul>
            </nav>
          </div>

          <div id="map">
            {/* <img src={img} alt="Map" /> */}
            {shopList.length > 0 && (
              <GoogleMap locations={shopList} />
            )}

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default FindAshop;
