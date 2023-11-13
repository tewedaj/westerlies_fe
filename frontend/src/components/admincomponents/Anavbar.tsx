import blogs from "../../assets/admin/blogs.jpg";
import article from "../../assets/admin/articles.jpg";
import reports from "../../assets/admin/reports.jpg";
import stores from "../../assets/admin/stores-removebg-preview.png";
import email from "../../assets/admin/mail.png";
import settings from "../../assets/admin/settings.jpg";
import { Link } from "react-router-dom";
const Anavbar = () => {
  return (
    <div className="navcontainer">
      <nav className="nav">
        <div className="nav-upper-options">
          <div className="nav-option option1">
            <img src={blogs} className="nav-img" alt="dashboard" />
            <h3> Blog</h3>
          </div>

          <div className="option2 nav-option">
            <img src={article} className="nav-img" alt="articles" />
            <a href="articles.html">
              <h3>Articles</h3>
            </a>
          </div>

          <div className="nav-option option3">
            <img src={reports} className="nav-img" alt="report" />
            <h3> Report</h3>
          </div>

          <div className="nav-option option4">
            <img src={stores} className="nav-img" alt="institution" />
            <h3>
              {" "}
              <Link to="/store mgmt"> Stores</Link>
            </h3>
          </div>

          <div className="nav-option option5">
            <img src={email} className="nav-img" alt="blog" />
            <h3>
              {" "}
              <Link to="/email mgmt">Emails</Link>
            </h3>
          </div>

          <div className="nav-option option6">
            <img src={settings} className="nav-img" alt="settings" />
            <h3> Settings</h3>
          </div>

          <div className="nav-option logout">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
              className="nav-img"
              alt="logout"
            />
            <h3>Logout</h3>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Anavbar;
