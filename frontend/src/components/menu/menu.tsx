import React, { useState } from 'react';
import './style.menu.css';
import { menuInfo } from './prop.menu';
import { AiFillForward } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { getLinkClass } from '../header/controller.header';
const Menu = (isOpenProp: menuInfo) => {
  const [isOpen, setIsOpen] = useState(isOpenProp.isOpen);

  const toggleMenu = () => {
    isOpenProp.callBack();
  };

  return (
    <div className={`menu ${isOpenProp.isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        <AiFillForward />
      </button>
      <ul className="menu-items">
      <li>
              {" "}
              <Link className={getLinkClass(isOpenProp.title, "home","smallScreen")} to="/">
                {"Home"}
              </Link>
            </li>
            <li>
              <Link className={getLinkClass(isOpenProp.title, "pricing","smallScreen")} to="/">
                {"Search"}
              </Link>
            </li>
            <li>
              <Link
                className={getLinkClass(isOpenProp.title, "how_it_works","smallScreen")}
                to="/About"
              >
               About
              </Link>
            </li>
            <li>
              <Link
                className={getLinkClass(isOpenProp.title, "how_it_works","smallScreen")}
                to="/Blog"
              >
               Blog
              </Link>
            </li>
      </ul>
    </div>
  );
};

export default Menu;
