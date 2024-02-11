import axios from "axios";
import { url } from "../../util/constant";



export const getStoreDetailInfo = async (storeId: number,addressId: number) => {
    try {
      const response = await axios.get(`${url}api/store/${storeId}`);
      const storeInfo = response.data;
        return storeInfo;

    } catch (error) {
      console.log(error);
    }
  };

  export const getRandomStores = async () => {
    try {
      const response = await axios.get(`${url}api/store/random/4`);
      const stores = response.data;
        return stores;

    } catch (error) {
      console.log(error);
    }
  }
