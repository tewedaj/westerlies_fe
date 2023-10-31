


import { ShopeProp } from "./prop.shope";
import "./style.shope.css";
export default function Shope(shopeProp: ShopeProp){

    return(
        <div className="result-container">
        <div className="result">
          <img src={shopeProp.image} alt="Shop 1" />
          <p>{shopeProp.name}</p>
          <p>{shopeProp.primaryKey}</p>
        </div>
        </div>
    );
}