import "./ShopPage.css";
import Header from "../../components/header/Header";
import logo from "../../assets/logo.png";
import bg1 from "../../assets/shopPage/bg1.png";
import storeimg from "../../assets/footer3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Footer from "../../components/footer/Footer";

const ShopPage = () => {
  const [isNavbarVisibletwo] = useState(true);
  const [navbarcolor] = useState(false);
  const [shopePage] = useState(true);
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
              <img src={storeimg} />
            </div>
          </div>

          <div className="section-one-part2">
            <div className="section-one-part2-text-section">
              <h1>Salt & Sundry</h1>
              <p>
                Salt &Sundry is a home and lifestyle boutique featuring
                homewares and goods, apparel, apothecary, accessories, and other
                goods from independent makers and designers, both local and from
                across the globe,including 80+ women-owned, 25+ BI POC-owned and
                20+ local to the DC region.They also contribute to organizations
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
                  <p>MONDAY</p>
                  <p>TUESDAY</p>
                  <p>WEDNESDAY</p>
                  <p>MONDAY</p>
                  <p>MONDAY</p>
                </div>
                <div className="section-two-part1-working-hours">
                  <p>12pm - 6pm</p>
                  <p>12pm - 6pm</p>
                  <p>12pm - 6pm</p>
                  <p>12pm - 6pm</p>
                  <p>12pm - 6pm</p>
                </div>
              </div>
              <div className="section-two-part1-loc">
                <p>1 309 5th Street Northeast Union Market</p>
                <p>Washington, District of Columbia 20002</p>
                <p>+ 1 202 . 5 56.1 86 6</p>
              </div>
            </div>
          </div>
          <div className="section-two-part2">
            <img src={storeimg} />
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
