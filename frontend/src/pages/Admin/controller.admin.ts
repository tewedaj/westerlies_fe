import axios from "axios";

const apiBaseUrl = "https://apibeta.westerlies.com"; // Replace with your API base URL

function getAdminStores(page: any, size: any) {
  const apiUrl = `${apiBaseUrl}/api/store/getAdminStores?page=${page}&size=${size}`;

  return axios.get(apiUrl)
    .then((response) => {
      // Handle the response data here
      return response.data;
    })
    .catch((error) => {
      // Handle errors
      throw error;
    });
}

export default getAdminStores;
