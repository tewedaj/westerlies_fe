import "./FASheader.css";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const FASheader = () => {
  const [isNavbarVisible, setNavbarVisibility] = useState(false);

  const toggleNavbar = () => {
    setNavbarVisibility(!isNavbarVisible);
  };
  return (
    <>
      <header className="header2">
        <div className={`navbar2 ${isNavbarVisible ? "" : "navbar-hidden2"}`}>
          <ul>
            <li>
              <Link to="/Find A Shop">Search </Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/">Blog</Link>
            </li>
          </ul>
        </div>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <input
          onClick={() => {
            toggleNavbar();
          }}
          id="toggle"
        ></input>
        <label htmlFor="toggle">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </header>
    </>
  );
};

export default FASheader;
