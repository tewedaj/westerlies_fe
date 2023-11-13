import "./Filterlist.css";
import { FilterProp } from "./prop.Filterlist";

const Filterlist = (FilterProp: FilterProp) => {
  return (
    <div
      className={
        FilterProp.isOpen
          ? "check-list-background"
          : "check-list-background-disabled"
      }
    >
      <div className="checklist">
        <h1>BY {FilterProp.title}</h1>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Default checkbox
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Default checkbox
          </label>
        </div>
      </div>
    </div>
  );
};

export default Filterlist;
