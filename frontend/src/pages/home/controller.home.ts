import axios from "axios";

import { url } from "../../util/constant";

export function discoverNow(name: string){
    return new Promise((resolve, reject) => {
        axios.get(url+'api/search/store/byName?key=' +name+'&page=1&size=10')
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
