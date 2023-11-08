import Aheader from "../../components/admincomponents/Aheader";
import Anavbar from "../../components/admincomponents/Anavbar";
import article from "../../assets/admin/articles.jpg";
import views from "../../assets/admin/view-removebg-preview.png";
import search from "../../assets/admin/search.png";
import like from "../../assets/admin/like-removebg-preview.png";
import "./responsive.css";
import "./style.css";
import { FcSearch } from "react-icons/fc";

const Main = () => {
  return (
    <>
      <Aheader></Aheader>
      <div className="main-container">
        <Anavbar></Anavbar>
        <div className="main">
          {/* <div className="search-box">
            <input type="text" placeholder="Search..." />{" "}
            <h2>
              <FcSearch />
            </h2>
          </div> */}

          <div className="box-container">
            <div className="box box1">
              <div className="text">
                <h2 className="topic-heading">150</h2>
                <h2 className="topic">Likes</h2>
              </div>
              <img src={like} alt="likes" />
            </div>

            <div className="box box2">
              <div className="text">
                <h2 className="topic-heading">60.5k</h2>
                <h2 className="topic">Article Views</h2>
              </div>
              <img src={views} alt="Views" />
            </div>

            <div className="box box3">
              <div className="text">
                <h2 className="topic-heading">320</h2>
                <h2 className="topic">Comments</h2>
              </div>

              <img src={article} alt="comments" />
            </div>
          </div>

          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">Recent Articles</h1>
              <button className="view">View All</button>
            </div>

            <div className="report-body">
              <div className="report-topic-heading">
                <h3 className="t-op">Article</h3>
                <h3 className="t-op">Views</h3>
                <h3 className="t-op">Comments</h3>
                <h3 className="t-op">Status</h3>
              </div>

              <div className="items">
                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 73</h3>
                  <h3 className="t-op-nextlvl">2.9k</h3>
                  <h3 className="t-op-nextlvl">210</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 72</h3>
                  <h3 className="t-op-nextlvl">1.5k</h3>
                  <h3 className="t-op-nextlvl">360</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 71</h3>
                  <h3 className="t-op-nextlvl">1.1k</h3>
                  <h3 className="t-op-nextlvl">150</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 70</h3>
                  <h3 className="t-op-nextlvl">1.2k</h3>
                  <h3 className="t-op-nextlvl">420</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 69</h3>
                  <h3 className="t-op-nextlvl">2.6k</h3>
                  <h3 className="t-op-nextlvl">190</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 68</h3>
                  <h3 className="t-op-nextlvl">1.9k</h3>
                  <h3 className="t-op-nextlvl">390</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 67</h3>
                  <h3 className="t-op-nextlvl">1.2k</h3>
                  <h3 className="t-op-nextlvl">580</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 66</h3>
                  <h3 className="t-op-nextlvl">3.6k</h3>
                  <h3 className="t-op-nextlvl">160</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 65</h3>
                  <h3 className="t-op-nextlvl">1.3k</h3>
                  <h3 className="t-op-nextlvl">220</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Main;
