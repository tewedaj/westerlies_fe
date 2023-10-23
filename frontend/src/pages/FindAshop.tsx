import Footer from "../components/Footer";
import "../components/FASheader.css";
import img from "../assets/footer1.png";
import "./FindAshop.css";
import FASheader from "../components/FASheader";
const FindAshop = () => {
  return (
    <>
      <FASheader />
      <div className="title">
        <h1>Find a Shop &nbsp;&nbsp;|</h1>
        <h1>&nbsp;&nbsp;Washington D.C</h1>
      </div>
      <div className="filter">
        <h3>FILTER BY:</h3>
        <ul>
          <li>PRODUCT</li>
          <li>SOCIAL IMPACT</li>
          <li>OFFERS CLASSES</li>
        </ul>
      </div>
      <div className="grid-container">
        <div className="grid-item">
          <img src={img} alt="Image 1" />
          <h2>Salt and Sundry</h2>
          <p>GIFTS</p>
        </div>
        <div className="grid-item">
          <img src={img} alt="Image 2" />
          <h2>Made in Dc</h2>
          <p>Stationery / Apparel / GIFTS</p>
        </div>
        <div className="grid-item-map">
          <img src={img} alt="Map Image" />
        </div>
      </div>

      <Footer />
    </>
  );
};
export default FindAshop;
