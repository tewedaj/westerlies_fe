
import footer1 from "../../assets/footer1.png";
import footer2 from "../../assets/footer2.png";
import footer3 from "../../assets/footer3.png";
import footer4 from "../../assets/footer4.png";
import logo from "../../assets/logo_white.png";
import "./Footer.css";
import "./mobile.footer.css";
const Footer = () => {

  return (
    <footer>
      <div className="connect">
        <div className="ftext-section">
          <h1>
            CONNECT <br></br>WITH US
          </h1>
          <a
            href="https://www.instagram.com/followthewesterlies/"
            target="_blank"
          >
            @followthewesterlies
          </a>
        </div>

        <div className="fimage-section">
          <a
            href="https://www.instagram.com/followthewesterlies/"
            target="_blank"
          >
            {" "}
            <img src={footer1} />{" "}
          </a>
          <a
            href="https://www.instagram.com/followthewesterlies/"
            target="_blank"
          >
            {" "}
            <img src={footer2} />{" "}
          </a>
          <a
            href="https://www.instagram.com/followthewesterlies/"
            target="_blank"
          >
            {" "}
            <img src={footer3} />{" "}
          </a>
          <a
            href="https://www.instagram.com/followthewesterlies/"
            target="_blank"
          >
            {" "}
            <img src={footer4} />{" "}
          </a>
        </div>
      </div>
      <div className="email-collection">
        <div className="logo">
          <img src={logo} />
        </div>
        <div className="email">
          <div className="explorewithus">
            <h3>EXPLORE WITH US</h3>
          </div>

          <div className="explorewithus-input">
            <input
              type="text"
              name="signup"
              id="signup"
              placeholder="  Sign up and explore (sign up feature coming soon)"
            />
          </div>

          <div className="explorewithus-button">
            <button>SIGN UP</button>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="copyrightInner">
          <p>Copyright Westerlies 2023</p>
        </div>
        <div className="acknowledgments">
          <a href="https://maradesignco.com/" target="_blank">
            Web Design by MARA
          </a>
          <a href="https://www.sidewaysgravity.com/" target="_blank">
            Web Design Support by Sideways Gravity
          </a>
          <a href="https://joynevada.com/" target="_blank">
            Logo Design by Joy Nevada
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
