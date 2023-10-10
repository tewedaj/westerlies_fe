import "./Header.css";
import { useState } from "react";
import logo from "../assets/logo.png";
const FASheader = () => {
  const [isNavbarVisible, setNavbarVisibility] = useState(false);

  const toggleNavbar = () => {
    setNavbarVisibility(!isNavbarVisible);
  };
  return (
    <>
      <header>
        <div className={`navbar ${isNavbarVisible ? "" : "navbar-hidden"}`}>
          <ul>
            <li>Search</li>
            <li>About</li>
            <li>Blog</li>
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
