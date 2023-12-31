import { ShopeProp } from "./prop.shope";
import "./style.shope.css";
import Image_not_available from "../../assets/Image_not_available.png";
export default function Shope(shopeProp: ShopeProp) {
  return (
    <div
      onClick={() => {
        shopeProp.callBack();
      }}
      className="result"
    >
      <img
        src={
          shopeProp?.image == ""
            ? Image_not_available
            : shopeProp.image
            ? shopeProp.image?.replace("http:", "https:")
            : Image_not_available
        }
        alt="Shop 1"
      />
      <h3>{shopeProp.name} </h3>
      <p>{shopeProp.primaryKey}</p>
    </div>
  );
}
