import "./Home.css";
import Header from "../components/Header";
import hero from "../assets/home/hero.jpg";
import whiteLogo from "../assets/logo_white.png";
import bg from "../assets/home/homebg1.png";
import first from "../assets/home/seimg1.png";
import second from "../assets/home/seimg2.png";
import thrid from "../assets/home/seimg3.png";
import storeImage from "../assets/home/learnMoreimg.png";
import feature from "../assets/home/featured.png";
import blog1 from "../assets/home/blog1.png";
import blog2 from "../assets/home/blog2.png";
import blog3 from "../assets/home/blog3.png";
const Home = () => {
  return (
    <>
      <header>
        <Header headerBg={bg} logo={whiteLogo} />
      </header>

      <div className="container">
        <div className="content">
          <div className="hero-section">
            <img className="hero" src={hero} alt="Hero" />
            <div className="text-section">
              <h1>
                Find and Support <br /> Independent Shop + Makers
              </h1>
              <h3>AROUND THE CORNER OR ACROSS THE WORLD.</h3>
              <p>
                Westerlies is on a mission to connect you with local businesses
                who <br /> sell goods that make the world a more beautiful,
                thoughtful place.
              </p>
              <input type="text" placeholder="ENTER LOCATION (city name)" />
              <button type="button">DISCOVER NOW</button>
            </div>
          </div>
          <div className="start-exploring">
            <h1>Start Exploring</h1>

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
                  Have something specific in mind? Discover the latest from
                  local artisans & small shops.
                </p>
                <button>DISCOVER NOW</button>
              </div>

              <div className="third">
                <img src={thrid} />
                <h2>By Social Impact </h2>
                <p>
                  Looking to support a specific cause? Find a maker or small
                  shop who does so.
                </p>
                <button>DISCOVER NOW</button>
              </div>
            </div>
          </div>
          <div className="learn-more">
            <div className="store-description">
              <h1>Salt & Honey Market</h1>
              <h3>SALT LAKE CITY, UT</h3>
              <p>
                A little spot goes here to tell a bit about the shop & more
                about their story, what they carry, etc.
              </p>
              <button type="button">LEARN MORE</button>
            </div>
            <div className="store-image">
              <img className="featured" src={feature} />
              <img className="store-img" src={storeImage} />
            </div>
          </div>
          <div className="blog-section">
            <h1>LATEST FROM THE BLOG</h1>

            <div className="images-section">
              <div className="first">
                <img src={blog1} />
                <h2>BLOG POST TITLE HERE</h2>
                <p>
                  Have something specific in mind? Discover the latest from
                  local artisans & small shops.
                </p>
              </div>
              <div className="second">
                <img src={blog2} />
                <h2>BLOG POST TITLE HERE</h2>
                <p>
                  Have something specific in mind? Discover the latest from
                  local artisans & small shops.
                </p>
              </div>

              <div className="third">
                <img src={blog3} />
                <h2>BLOG POST TITLE HERE</h2>
                <p>
                  Have something specific in mind? Discover the latest from
                  local artisans & small shops.
                </p>
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
            <button>MORE ABOUT US</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
