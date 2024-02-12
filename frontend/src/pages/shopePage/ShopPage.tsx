import "./ShopPage.css";
import Header from "../../components/header/Header";
import logo from "../../assets/logo.png";
import bg1 from "../../assets/shopPage/bg1.png";
import storeimg from "../../assets/footer3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import { useActionData, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getRandomStores, getStoreDetailInfo } from "./shopeController";
import GoogleMap from "../../components/mapComponent/mapComponent";
import { set } from "react-hook-form";

const ShopPage = () => {
  const [isNavbarVisibletwo] = useState(false);
  const [navbarcolor] = useState(false);
  const [shopePage] = useState(false);
  const param = useParams();
  const [storeId] = useState<any>(param.id);
  const [storeInfo, setStoreInfo] = useState<any>();
  const [shopeLocation, setShopeLocation] = useState<any[]>([]);
  const [randomStore,setRandomStore] = useState([]);
  const [diffCity, setDiffCity] = useState<any[]>([]);
  //const [isFirstRendered, setIsFirstRendered] = useState<boolean>(false);
  const [selectedCity, setSelectedCity] = useState<any>();
  const navg: any = useNavigate();
  
  var isFirstRendered = false;
  useEffect(() => {
    getStoreDetailInfo(storeId, 0).then((res) => {
      setStoreInfo(res);
     var diffCity = getUniqueStates(res?.addresses);
    console.log("Diff City: ", param?.city);
    setSelectedCity(param?.city);
      setDiffCity(diffCity);
      var locationList: any[] = [];
      res?.addresses?.map((item: any) => {
        locationList.push({
          latitude: item?.location?.latitude,
          longitude: item?.location?.longitude,
        });
      });
      setShopeLocation(locationList);
      console.log(res);
    });

    getRandomStores().then((res:any) => {  
      console.log(res);
      setRandomStore(res);
    });

  }, []);


  function getLocationListBasedOnCity(city: any) {
    var locationList: any[] = [];
    storeInfo?.addresses?.map((item: any) => {
      if (item.location.state == city) {
        locationList.push({
          latitude: item?.location?.latitude,
          longitude: item?.location?.longitude,
        });
      }
    });
    return locationList;
  }

  function getUniqueStates(addresses: any): any[] {
    let uniqueStates = new Set();
    console.log("Addresses: ", addresses);
    addresses.map((address: any) => {
        let state = address.location.state;
        uniqueStates.add(state);
    });
    console.log("Unique States: ", uniqueStates)
    return Array.from(uniqueStates);
}


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
              <a>{/* <IoIosArrowBack /> Back to Directory */}</a>
            </div>

            <div className="result-2">
              <img
                src={storeInfo?.profilePicture
                  .replace("http://", "https://")
                  .replace("api.westerlies.io", "apibeta.westerlies.com")}
              />
              <p> This image belongs to d {storeInfo?.name} </p>
            </div>
          </div>

          <div className="section-one-part2">
            <div className="section-one-part2-text-section">
              <h1>{storeInfo?.name} </h1>
              <p>{storeInfo?.description}</p>
            </div>
            <div className="section-one-part2-link-section">
              <p>
                Also visit their sister store Little Leaf at littleleafshop.com!
              </p>
              <div className="section-one-part2-links">
                <div className="section-one-part2-links-social">
                  <h5>SOCIAL</h5>
                  { 
                    storeInfo?.webPresences?.map((item: any) => {
                      if (item?.webSite == "INSTAGRAM") {
                        return (
                          <a target="_blank" style={{textDecoration: 'none', color: 'black',fontSize: 30, margin:10, marginLeft: 0,marginTop:0 }} href={item.link}>
                            <FontAwesomeIcon icon={faInstagram} />
                          </a>
                        );
                      }
                      if (item?.webSite == "FACEBOOK") {
                        return (
                          <a target="_blank" style={{textDecoration: 'none', color: 'black',fontSize: 30, margin:10, marginLeft: 0,marginTop:0 }} href={item.link}>
                            <FontAwesomeIcon icon={faFacebookF} />
                          </a>
                        );
                      }

                  
                      return <></>;
                  })
                }
           
                </div>

                <div className="section-one-part2-links-join">
                  <h5>JOIN IN</h5>
                  <p className="description">
                    Join Little Leaf for workshops and other<br></br>events at
                    littleleafshop.com/pages/events!
                  </p>
                </div>
                <div className="section-one-part2-links-button">
                  <h5>IMPACT</h5>
                  <div className="section-one-part2-links-button-btn">
                    <div className="impact-buttons">
                      <button>Women-owned</button>
                    </div>
                    <div className="impact-buttons">
                      <button>Gives Back</button>
                    </div>
                    <div className="impact-buttons">
                      <button>Gives Back</button>
                    </div>
                    <div className="impact-buttons">
                      <button>Gives Back</button>
                    </div>
                    <div className="impact-buttons">
                      <button>Gives Back</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        

{storeInfo?.addresses.map((items: any,index: number) => {
    if(selectedCity != items.location.state){
      return(<></>)
    }

  if(!isFirstRendered){
    isFirstRendered = true;

    return (
<div className="section-two">
          <div className="section-two-part1">
            <h1>Stop by</h1>

            <div className="section-two-part1-infoloc">
              <div className="section-two-part1-info">
                <div className="section-two-part1-working-days">
                  {items?.businessHours?.map((item: any) => {
                    return <p>{item?.day}</p>;
                  })}{" "}
                </div>
                <div className="section-two-part1-working-hours">
                  {items?.businessHours?.map((item: any) => {
                    return (
                      <p>
                        {item?.startTime} - {item?.endTime}
                      </p>
                    );
                  })}{" "}
                </div>
              </div>
              <div className="section-two-part1-loc">
              
                      <p>{items?.location?.street}</p>
                      <p>{items?.location?.city?.countryName}</p>
                      <p> {items.location?.state} {items.location?.zip}</p>
                      <p>{items?.location?.country}</p>
                 
              </div>
            </div>
          </div>
          <div className="section-two-part2">
            <div
              id="map"
              style={{ width: 500, overflow: "hidden", background: "red" }}
            >
              <GoogleMap locations={getLocationListBasedOnCity(selectedCity)} />
            </div>
            <div style={{display:'flex',flexDirection:'column',color:'white'}}>
                  {diffCity?.map((state: any) => {
                    return(
                      <span onClick={()=>{
                        setSelectedCity(state);
                      }} style={{backgroundColor: selectedCity == state? "gray" : '#F2ECE5',margin:10,borderRadius: 10,color:'black',padding:15}}>{state}</span>
                    )
                  })
                  }
            </div>
          </div>
      
        </div>
    )
   
  }

  return(
    <div className="section-two-two" style={{background:'#202D3F'}}>
    <div className="section-two-part1">
     

      <div className="section-two-part1-infoloc" >
        <div className="section-two-part1-info">
          <div className="section-two-part1-working-days" >
            {items.businessHours?.map((item: any) => {
              return <p>{item?.day}</p>;
            })}{" "}
          </div>
          <div className="section-two-part1-working-hours">
            {items.businessHours?.map((item: any) => {
              return (
                <p>
                  {item?.startTime} - {item?.endTime}
                </p>
              );
            })}{" "}
          </div>
        </div>
        <div className="section-two-part1-loc">
       
              <p>{items?.location?.street}</p>
                      <p>{items?.location?.city?.countryName}</p>
                      <p> {items.location?.state} {items.location?.zip}</p>
                      <p>{items?.location?.country}</p>
        
        </div>
      </div>
    </div>
    <div className="section-two-part2">

    </div>
  </div>
  )
}
)}
      

        
        <div className="section-three">
          <div className="section-three-text">
            {" "}
            <h1>Gallery</h1>
          </div>
          <div className="section-three-images" style={{height:700}}>
        {storeInfo?.instagramPhotos.map((item:any) => {
          return (
            <iframe
            title="Instagram Post"
            src={item.url +"embed/captioned/?cr=1&v=14&wp=583&rd=https%3A%2F%google.com&rp=%2Fembed%3Furl%3Dhttps%253A%252F%252Fwww.instagram.com%252Fp%252FC1sw3fEJJ9W%252F%253Fhl%253Den%26id%3Dmntl-sc-block_1-0-9-iframe%26options%3De30%253D%26docId%3D8422682#%7B%22ci%22%3A0%2C%22os%22%3A1948.5%2C%22ls%22%3A430.90000000037253%2C%22le%22%3A1514.800000000745%7D"}
            width="500"
            height="600"
                    style={{zIndex:1000, margin: 10}}
          ></iframe>
          )
        })}
          
    </div>
        </div>
        <div className="section-four">
          <div className="section-four-header">
            <h1>Store reviews</h1>
          </div>
          {/* <div className="section-four-text">
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
          </div> */}
          <div>
            <button onClick={() =>{
              // open google reviews link in a new tab
              window.open(storeInfo?.googleReviewUrl)
            }} > read reviews on google</button>
          </div>
        </div>
        <div className="section-five">
          <div className="section-five-part1">
            <h1>Other Stores You May Love</h1>
          </div>
          <div style={{margin:20,display:'flex',flexDirection:'row'}}>
            { randomStore.map((res: any)=>(
  <div  onClick={()=>{
    // go to a new store page
   
    window.open(`/shop_page/${res.id}`)
  }} className="section-five-part2-results">
  {" "}
  <img     src={res?.profilePicture
                  .replace("http://", "https://")
                  .replace("api.westerlies.io", "apibeta.westerlies.com")} />
  <h3>{res.name}</h3>
  <p>{res?.primaryTag}</p>
</div>
            ))
            
            }
            
        
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;
// https://www.instagram.com/p/C1sw3fEJJ9W/embed/captioned/?cr=1&v=14&wp=583&rd=https%3A%2F%2Fpeople.com&rp=%2Fembed%3Furl%3Dhttps%253A%252F%252Fwww.instagram.com%252Fp%252FC1sw3fEJJ9W%252F%253Fhl%253Den%26id%3Dmntl-sc-block_1-0-9-iframe%26options%3De30%253D%26docId%3D8422682#%7B%22ci%22%3A0%2C%22os%22%3A1948.5%2C%22ls%22%3A430.90000000037253%2C%22le%22%3A1514.800000000745%7D
// <blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/C2SFZ73Ih5D/?utm_source=ig_embed&amp;utm_campaign=loading" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"> <a href="https://www.instagram.com/p/C2SFZ73Ih5D/?utm_source=ig_embed&amp;utm_campaign=loading" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"> <div style=" display: flex; flex-direction: row; align-items: center;"> <div style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"></div></div></div><div style="padding: 19% 0;"></div> <div style="display:block; height:50px; margin:0 auto 12px; width:50px;"><svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-511.000000, -20.000000)" fill="#000000"><g><path d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"></path></g></g></g></svg></div><div style="padding-top: 8px;"> <div style=" color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;">View this post on Instagram</div></div><div style="padding: 12.5% 0;"></div> <div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"></div> <div style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"></div> <div style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"></div></div><div style="margin-left: 8px;"> <div style=" background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"></div> <div style=" width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"></div></div><div style="margin-left: auto;"> <div style=" width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"></div> <div style=" background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"></div> <div style=" width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"></div></div></div> <div style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center; margin-bottom: 24px;"> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 224px;"></div> <div style=" background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 144px;"></div></div></a><p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"><a href="https://www.instagram.com/p/C2SFZ73Ih5D/?utm_source=ig_embed&amp;utm_campaign=loading" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none;" target="_blank">A post shared by The wholly pun bible 📖 (@pun_bible)</a></p></div></blockquote> <script async src="//www.instagram.com/embed.js"></script>