import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../menu/menu";
import "./Header.css";
interface HeaderProps {
  logo: string;
  headerBg?: string;
  headerBgColor?: string;
  navbartwo?: boolean;
  navbarcolor?: boolean;
  type?: string;
  shopePage?: boolean;
}

const Header = ({
  logo,
  headerBg,
  navbartwo,
  navbarcolor,
  headerBgColor,
  type,
  shopePage,
}: HeaderProps) => {
  const [isNavbarVisible, setNavbarVisibility] = useState(false);
  const headerStyle = {
    backgroundImage: `url(${headerBg})`,
    width: "100%",
    margin: 0,
    overflow: "hidden",
  };
  const bgcolor = {
    backgroundColor: headerBgColor,
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header style={type == "FindaShop" ? bgcolor : headerStyle}>
        <Menu
          isOpen={isOpen}
          title={"home"}
          callBack={() => {
            setIsOpen(!isOpen);
          }}
        />
        <div className={`navbar ${isNavbarVisible ? "" : "navbar-hidden"}`}>
          <ul className={navbarcolor ? "navbarcolor1" : "navbarcolor2"}>
            <li className={shopePage ? "extra" : "extra-disable"}>
              <Link to="/Find A Shop">Explore</Link>
            </li>
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
            setIsOpen(!isOpen);
            //toggleNavbar();
          }}
          id="toggle"
        ></input>
        <label htmlFor="toggle">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className={navbartwo ? "navbar" : "navbar-two-hidden"}>
          <ul className={navbarcolor ? "navbarcolor1" : "navbarcolor2"}>
            <li>
              <Link to="/Find A Shop">SUGGEST A STORE</Link>
            </li>
            <li>
              <Link to="/about">SIGN UP</Link>
            </li>

            <li>
              <Link to="/">LOG IN</Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
