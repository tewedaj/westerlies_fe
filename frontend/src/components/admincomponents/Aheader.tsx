import logo from "../../assets/logo_white.png";
const Aheader = () => {
  return (
    <header className="headerA">
      <div className="logosec">
        <div className="logo"></div>
        <img src={logo} className="icn menuicn" id="menuicn" alt="menu-icon" />
      </div>
      <div className="message">
        <div className="dp">
          <img src={""} className="dpicn" alt="dp" />
        </div>
      </div>
    </header>
  );
};

export default Aheader;
