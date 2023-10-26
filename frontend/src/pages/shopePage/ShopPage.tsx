import "./ShopPage.css";
import Header from "../../components/header/Header";
import logo from "../../assets/logo.png";
import bg1 from "../../assets/shopPage/bg1.png";
import bg2 from "../../assets/shopPage/bg2.png";
import bg3 from "../../assets/shopPage/bg3.png";
import storeimg from "../../assets/footer3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";

const ShopPage = () => {
  return (
    <>
      <Header headerBg={bg1} logo={logo} />
      <div className="container-3">
        <div className="section-one">
          <div className="store2-image">
            <a> Back to Directory</a>
            <img src={storeimg} alt="Hero" />
          </div>

          <div className="text-section">
            <h1>Salt & Sundry</h1>
            <p>
              Salt &Sundry is a home and lifestyle boutique featuring homewares
              and goods, apparel, apothecary, accessories, and other goods from
              independent makers and designers, both local and from across the
              globe,including 80+ women-owned, 25+ BI POC-owned and 20+ local to
              the DC region.They also contribute to organizations
            </p>

            <p>
              Also visit their sister store Little Leaf at littleleafshop.com!
            </p>
            <div className="links">
              <h5>SOCIAL</h5>

              <FontAwesomeIcon icon={faFacebookF} />

              <h5>JOIN IN</h5>
              <p className="description">
                Join Little Leaf for workshops and other events at
                littleleafshop.com/pages/events!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
