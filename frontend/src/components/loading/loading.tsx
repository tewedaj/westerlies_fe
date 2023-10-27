
import { loadingProp } from "./prop.loading";
import "./style.loading.css";
import whiteLogo from "../../assets/logo_white.png";
import "./style.mobile.loading.css";
export function Loading(loadingProp: loadingProp){

    return(
        <div className={loadingProp.loading?"LoadingParent-active" : "LoadingParent"}>
            <div className="loadingComponent">
        <img src={whiteLogo} width={150} />
            </div>
        </div>
    )
}