import "./Home.css";
import "./mobile.home.css";
import "../../components/header/Header.css";
import Header from "../../components/header/Header";
import hero from "../../assets/home/hero.jpg";
import whiteLogo from "../../assets/logo_white.png";
import bg from "../../assets/home/homebg1.png";
import first from "../../assets/home/seimg1.png";
import second from "../../assets/home/seimg2.png";
import thrid from "../../assets/home/seimg3.png";
import storeImage from "../../assets/home/learnMoreimg.png";
import feature from "../../assets/home/featured2.png";
import blog1 from "../../assets/home/blog1.png";
import blog2 from "../../assets/home/blog2.png";
import blog3 from "../../assets/home/blog3.png";
import arrowbutton from "../../assets/home/arrow_in_circle.svg";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { discoverNow, getRandomStores } from "./controller.home";
import { useEffect, useState } from "react";
import { Loading } from "../../components/loading/loading";
import LocationInput from "../../components/locationInput/locationInput";
import Slideshow from "../../components/slideShow/slideshow";
import HeroImage from "../../components/heroImage/HeroImage";
const Home = () => {
  const [tobeDiscovered, setTobeDiscovered] = useState("");
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [randomStores, setRandomStores] = useState<any[]>([]);

  useEffect(() => {
    getRandomStores().then((res: any) => {
      setRandomStores(res.data);
    });
  }, []);

  const [navbar2] = useState(true);
  const navigator = useNavigate();
  return (
    <div className="container-abc">
      <Loading
        loading={loading}
        setLoading={(loading: string) => {
          setLoading(!loading);
        }}
      />
      <Header headerBg={bg} logo={whiteLogo} navbarcolor={navbar2} />

      <div className="content">
        <div className="hero-section">
          <div className="hero">
            {/* <img src={hero} alt="Hero" /> */}
            <HeroImage urls={randomStores} />
          </div>

          <div className="hero-text-section">
            <h1>
              Find and Support<br></br>Independent Shops + Makers
            </h1>
            <h3>
              <br></br>AROUND THE CORNER OR ACROSS THE WORLD.
            </h3>
            <p>
              Westerlies is on a mission to connect you with local businesses
              who <br /> sell goods that make the world a more beautiful,
              thoughtful place.
            </p>
            <div className="search">
              <LocationInput
                callBack={(city: string, country: string) => {
                  setCity(city);
                  setCountry(country);
                }}
              />
              {/* <input
                onChange={(e) => {
                  console.log(e.target.value);
                  setTobeDiscovered(e.target.value);
                }}
                name="heroo"
                id="heroo"
                type="text"
                placeholder="   ENTER LOCATION (city name)"
              /> */}
              <button
                onClick={() => {
                  setLoading(true);
                  navigator("/Find_A_Shop/" + country + "/" + city);
                }}
                type="button"
              >
                DISCOVER NOW
              </button>
            </div>
          </div>
        </div>
        <div className="start-exploring">
          <h1>Start Exploring (Feature Coming Soon)</h1>

          <div className="images-section">
            <div className="first">
              <img src={first} />
              <h2>By City</h2>
              <p>
                Find the hidden gems of your own city or shop small as you
                discover a new place.
              </p>
              <button>DISCOVER NOW</button>
            </div>
            <div className="second">
              <img src={second} />
              <h2>By Product</h2>
              <p>
                Have something specific in mind? Discover the latest from local
                artisans & small shops.
              </p>
              <button>DISCOVER NOW</button>
            </div>

            <div className="third">
              <img src={thrid} />
              <h2>By Social Impact </h2>
              <p>
                Looking to support a specific cause? Find a maker or small shop
                who does so.
              </p>
              <button>DISCOVER NOW</button>
            </div>
          </div>
        </div>
        {/* <div className="learn-more">
          <img className="arrowbutton" src={arrowbutton} />
          <div className="store-description">
            <h1>Salt & Honey Market</h1>
            <h3>SALT LAKE CITY, UT</h3>
            <p>
              A little spot goes here to tell a bit about the shop &<br></br>
              more about their story, what they carry, etc.
            </p>
            <button type="button">LEARN MORE</button>
          </div>

          <div className="learn-more-images">
            <img className="featured" src={feature} />
            <img className="store-img" src={storeImage} />
          </div>
          <img className="arrowbutton" src={arrowbutton} />
        </div> */}

        <Slideshow slides={randomStores} navigator={navigator} />

        <div className="learn-more-mobile">
          <img src={storeImage} />
          <div className="store-description">
            <h1>Salt & Honey Market</h1>
            <h3>SALT LAKE CITY, UT</h3>

            <button type="button">LEARN MORE</button>
          </div>
          <div></div>
        </div>
        <div className="blog-section">
          <h1>LATEST FROM THE BLOG (Blog Coming Soon)</h1>

          <div className="images-section">
            <div className="first">
              <img src={blog1} />
              {/* <h2>BLOG POST TITLE HERE</h2>
              <p>
                Have something specific in mind? Discover the <br></br>latest
                from local artisans & small shops.
              </p> */}
            </div>
            <div className="first">
              <img src={blog2} />
              {/* <h2>BLOG POST TITLE HERE</h2>
              <p>
                Have something specific in mind? Discover the<br></br> latest
                from local artisans & small shops.
              </p> */}
            </div>

            <div className="first">
              <img src={blog3} />
              {/* <h2>BLOG POST TITLE HERE</h2>
                <p>
                  Have something specific in mind? Discover the <br></br>latest
                  from local artisans & small shops.
                </p> */}
            </div>
          </div>
        </div>
        <div className="mission-section">
          <h1>OUR MISSION</h1>
          <p>
            Westerlies is on a mission to connect you with local businesses
            <br></br>
            who sell goods that make the world a more beautiful, thoughtful
            place.
          </p>
          <Link to="/about">
            <button>MORE ABOUT US</button>
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
