import "./ShopPage.css";
import Header from "../../components/header/Header";
import logo from "../../assets/logo.png";
import bg1 from "../../assets/shopPage/bg1.png";
import storeimg from "../../assets/footer3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";
import { getStoreDetailInfo } from "./shopeController";
import GoogleMap from "../../components/mapComponent/mapComponent";

const ShopPage = () => {
  const [isNavbarVisibletwo] = useState(true);
  const [navbarcolor] = useState(false);
  const [shopePage] = useState(true);
  const param = useParams();
  const [storeId, setStoreId] = useState<any>(param.id);
  const [storeInfo,setStoreInfo] = useState<any>();
  const [shopeLocation,setShopeLocation] = useState<any[]>([]);


  useEffect(() => {
    getStoreDetailInfo(storeId,0).then((res) => {
      setStoreInfo(res);
      var locationList:any[] = [];
      res?.addresses?.map((item:any)=>{
        locationList.push({
          latitude:item?.location?.latitude,
          longitude:item?.location?.longitude
        })
      })
      setShopeLocation(locationList);
      console.log(res);
    });
  },[]);

  return (
    <>
      <Header
        headerBg={bg1}
        logo={logo}
        navbartwo={isNavbarVisibletwo}
        navbarcolor={navbarcolor}
        shopePage={shopePage}
      />
      <div className="container-3">
        <div className="section-one">
          <div className="section-one-part1">
            <div className="section-one-part1-link">
              <a>
                <IoIosArrowBack /> Back to Directory
              </a>
            </div>

            <div className="section-one-part1-image">
              <img src={storeInfo?.profilePicture.replace("http://","https://").replace("api.westerlies.io","apibeta.westerlies.com")} />
            </div>
          </div>

          <div className="section-one-part2">
            <div className="section-one-part2-text-section">
              <h1>{storeInfo?.name} </h1>
              <p>
                {storeInfo?.description}
              </p>
            </div>
            <div className="section-one-part2-link-section">
              <p>
                Also visit their sister store Little Leaf at littleleafshop.com!
              </p>
              <div className="section-one-part2-links">
                <div className="section-one-part2-links-social">
                  <h5>SOCIAL</h5>
                  <FontAwesomeIcon icon={faFacebookF} />
                  &nbsp;&nbsp;&nbsp;
                  <FontAwesomeIcon icon={faInstagram} />
                </div>

                <div className="section-one-part2-links-join">
                  <h5>JOIN IN</h5>
                  <p className="description">
                    Join Little Leaf for workshops and other<br></br>events at
                    littleleafshop.com/pages/events!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="section-two">
          <div className="section-two-part1">
            <h1>Stop by</h1>

            <div className="section-two-part1-infoloc">
              <div className="section-two-part1-info">
                <div className="section-two-part1-working-days">
                  {storeInfo?.addresses[0]?.businessHours?.map((item:any)=> { 

                    return (
                      <>
                        <p>{item?.day}</p>
                        <p>{item?.startTime} - {item?.closingTime}</p>
                      </>
                    )
                  })}
              
                </div>
               
              </div>
              <div className="section-two-part1-loc">
                {storeInfo?.addresses.map((item:any)=>{
                  return (
                    <>
                      <p>{item?.location?.street}</p>
                      <p>{item?.location?.city?.countryName}</p>
                      {/* <p>{item?.location?.city} {item?.state} {item?.zipCode}</p> */}
                      <p>{item?.location?.country}</p>
                    </>
                  )
                })}
     
              </div>
            </div>
          </div>
          <div className="section-two-part2">
            <div id="map" style={{width:500,overflow:'hidden',background:'red'}}> 
          <GoogleMap locations={shopeLocation} />
          </div>
          </div>
        </div>
        <div className="section-three">
          <div className="section-three-text">
            {" "}
            <h1>Gallery</h1>
          </div>
          <div className="section-three-images">
            <img src={storeimg} /> <img src={storeimg} /> <img src={storeimg} />{" "}
            <img src={storeimg} /> <img src={storeimg} />
          </div>
        </div>
        <div className="section-four">
          <div className="section-four-header">
            <h1>Store reviews</h1>
          </div>
          <div className="section-four-text">
            <div className="s-4arrow">
              <h1>
                <IoIosArrowBack />
              </h1>
            </div>
            <div className="s-4text">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.Ut wisi enim ad minim veniam,quis nostrud
                exerci tation ullamcorper suscipit lobortis nisl ut
              </p>
            </div>
            <div className="s-4text">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.Ut wisi enim ad minim veniam,quis nostrud
                exerci tation ullamcorper suscipit lobortis nisl ut
              </p>
            </div>
            <div className="s-4text">
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.Ut wisi enim ad minim veniam,quis nostrud
                exerci tation ullamcorper suscipit lobortis nisl ut
              </p>
            </div>
            <div className="s-4arrow2">
              <h1>
                <IoIosArrowForward />
              </h1>
            </div>
          </div>
          <div>
            <button> read more on google</button>
          </div>
        </div>
        <div className="section-five">
          <div className="section-five-part1">
            <h1>Other Stores You May Love</h1>
          </div>
          <div className="section-five-part2">
            <div className="section-five-part2-results">
              {" "}
              <img src={storeimg} />
              <h3>Store Name</h3>
              <p>Primary tag</p>
            </div>
            <div className="section-five-part2-results">
              {" "}
              <img src={storeimg} />
              <h3>Store Name</h3>
              <p>Primary tag</p>
            </div>{" "}
            <div className="section-five-part2-results">
              {" "}
              <img src={storeimg} />
              <h3>Store Name</h3>
              <p>Primary tag</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;