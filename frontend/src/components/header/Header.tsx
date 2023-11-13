import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "../menu/menu";
interface HeaderProps {
  logo: string;
  headerBg?: string;
  headerBgColor?: string;
}

const Header = ({ logo, headerBg }: HeaderProps) => {
  const [isNavbarVisible, setNavbarVisibility] = useState(false);

  const toggleNavbar = () => {
    setNavbarVisibility(!isNavbarVisible);
  };
  const headerStyle = {
    backgroundImage: `url(${headerBg})`,
    width: "100%",
    margin: 0,
    overflow: "hidden",
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header style={headerStyle}>
        <Menu
          isOpen={isOpen}
          title={"home"}
          callBack={() => {
            setIsOpen(!isOpen);
          }}
        />
        <div className={`navbar ${isNavbarVisible ? "" : "navbar-hidden"}`}>
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
      </header>
    </>
  );
};

export default Header;
