import { useState } from "react";
import logo from "../../assets/logo_white.png";

const Aheader = () => {
  const [navBar, setNavbar] = useState<boolean>(false);
  return (
    <>
      <header className="headerA">
        <div className="logo">
          <img
            src={logo}
            className="icn menuicn"
            id="menuicn"
            alt="menu-icon"
            onClick={() => {
              setNavbar(!navBar);
            }}
          />
        </div>

        <div className="message">
          <div className="dp">
            <img src={""} className="dpicn" alt="dp" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Aheader;
