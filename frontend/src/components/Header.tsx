import { useState } from "react";
import { Link } from "react-router-dom";
interface HeaderProps {
  logo: string;
  headerBg: string;
}

const Header = ({ logo, headerBg }: HeaderProps) => {
  const [isNavbarVisible, setNavbarVisibility] = useState(false);

  const toggleNavbar = () => {
    setNavbarVisibility(!isNavbarVisible);
  };
  const headerStyle = {
    backgroundImage: `url(${headerBg})`, // Set the background image
  };

  return (
    <>
      <header style={headerStyle}>
        <div className={`navbar ${isNavbarVisible ? "" : "navbar-hidden"}`}>
          <ul>
            <Link to="/Find A Shop">
              <li>Search</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>

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

export default Header;
