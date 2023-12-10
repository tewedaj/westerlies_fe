import axios from "axios";
import { url } from "../../util/constant";



export const getStoreDetailInfo = async (storeId: number,_addressId: number) => {
    try {
      const response = await axios.get(`${url}api/store/${storeId}`);
      const storeInfo = response.data;
        return storeInfo;

    } catch (error) {
      console.log(error);
    }
  };
