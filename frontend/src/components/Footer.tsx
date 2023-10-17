import footer1 from "../assets/footer1.png";
import footer2 from "../assets/footer2.png";
import footer3 from "../assets/footer3.png";
import footer4 from "../assets/footer4.png";
import logo from "../assets/logo_white.png";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="connect">
          <div className="ftext-section">
            <h1>
              CONNECT <br></br>WITH US
            </h1>
            <p>@followthewesterlies</p>
          </div>

          <div className="fimage-section">
            <img src={footer1} />
            <img src={footer2} />
            <img src={footer3} />
            <img src={footer4} />
          </div>
        </div>
        <div className="email-collection">
          <div className="logo">
            <img src={logo} />
          </div>
          <div className="email">
            <h3>EXPLORE WITH US</h3>
            <input type="text" placeholder="Email Address" />
            <button>SIGN UP</button>
          </div>
        </div>
        <div className="copyright">
          <p>Copyright Westerlies 2023</p>

          <p>Web Design by MARA</p>
        </div>
      </footer>
    </>
  );
};
export default Footer;
