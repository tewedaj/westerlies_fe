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
        <h1>Find a Shop | </h1>
        <h1>Washington D.C</h1>
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
        </div>

        <div className="grid-item">
          <img src={img} alt="Image 2" />
        </div>

        <div className="grid-item"></div>
      </div>
      <Footer />
    </>
  );
};
export default FindAshop;
