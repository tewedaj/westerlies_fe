import { Link } from "react-router-dom";
import { LuMailCheck } from "react-icons/lu";
import { LiaStoreSolid } from "react-icons/lia";
import { BiLogOutCircle } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { PiArticleNyTimes } from "react-icons/pi";
import { ImBlog } from "react-icons/im";
const Anavbar = () => {
  return (
    <div className="navcontainer">
      <nav className="nav">
        <div className="nav-upper-options">
          <div className="nav-option option1">
            <h3>
              <ImBlog />
            </h3>
            <Link to="/admin"> Blog</Link>
          </div>

          <div className="option2 nav-option">
            <h3>
              <PiArticleNyTimes />
            </h3>
            <a href="articles.html">
              <Link to="/admin">Articles</Link>
            </a>
          </div>

          <div className="nav-option option3">
            <h3>
              <HiOutlineDocumentReport />
            </h3>
            <Link to="/admin"> Report</Link>
          </div>

          <div className="nav-option option4">
            <h3>
              <LiaStoreSolid />
            </h3>
            <h3>
              <Link to="/store mgmt"> Stores</Link>
            </h3>
          </div>

          <div className="nav-option option5">
            <h3>
              <LuMailCheck />
            </h3>
            <h3>
              <Link to="/email mgmt">Emails</Link>
            </h3>
          </div>

          <div className="nav-option option6">
            <h3>
              <FiSettings />
            </h3>
            <Link to="/admin"> Settings</Link>
          </div>

          <div className="nav-option logout">
            <h3>
              <BiLogOutCircle />
            </h3>
            <Link to="/admin">Logout</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Anavbar;
