import axios from "axios";

import { url } from "../../util/constant";

export function 
discoverNow(country: string,name: string,page: number){
    return new Promise((resolve, reject) => {
        axios.get(url+'api/search/store/'+country+'/'+name+'?page='+page+'&size=10')
          .then(function (response:any) {
            console.log(response);
            resolve(response);
          })
          .catch(function (error: any) {
            console.log(error);
          resolve(error);
          });
        });
}
