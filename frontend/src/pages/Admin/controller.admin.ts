import axios from "axios";

import { url } from "../../util/constant";
export interface StoreData {
  additionalInformation: string;
  addresses: Address[];
  claimed: boolean;
  currentAddress: Address;
  description: string;
  hasClass: boolean;
  id: number;
  learnWithUs: string;
  meetUs: string;
  name: string;
  products: Product[];
  profilePicture: string;
  profileVideo: string;
  rating: number;
  storeType: string;
  story: string;
  tags: Tag[];
  webPresences: WebPresence[];
}

export interface Address {
  businessHours: BusinessHour[];
  email: string;
  id: number;
  location: Location;
  phoneNumber: string;
}

export interface BusinessHour {
  day: string;
  endTime: string;
  id: number;
  open: boolean;
  startTime: string;
}

export interface Location {
  city: City;
  id: number;
  latitude: number;
  longitude: number;
  route: string;
  secondStreet: string;
  state: string;
  street: string;
  tip: string;
  zip: string;
}

export interface City {
  countryName: string;
  countryShortName: string;
  id: number;
  mapAttribute: MapAttribute;
}

export interface MapAttribute {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  shortName: string;
  zoom: number;
}

export interface Product {
  description: string;
  label: string;
  value: number;
}

export interface Tag {
  description: string;
  icon: string;
  id: number;
  tag: string;
  tagType: string;
}

export interface WebPresence {
  id: number;
  link: string;
  order: number;
  webSite: string;
}

export function getStore(authToken: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(url + "api/store/?page=1&size=100", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(response);
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
export function searchStoreByname(authToken: string, storeName: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        url + `api/search/store/byName?key=${storeName}&page=0&size=100`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log(response);
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}

export async function deleteStore(authToken: string, id: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(url + `api/store/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log(response);
      resolve(response);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
}
export async function uploadImage(
  file: string | Blob,
  authToken: string | null
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(url + "api/resource/upload", formData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Image uploaded successfully:", response.data.profilePicture);
    return response.data.profilePicture;
  } catch (error) {
    console.error("Error uploading image:", error);
    // Handle the error as needed
    throw error;
  }
}
export async function addStore(data: StoreData, authToken: string | null) {
  try {
    const response = await axios.post(url + "api/store/addStore", data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (Response) {
      console.error(
        "Server responded with non-2xx status",
        (error as any).response.data
      );
    } else if (Request) {
      console.error("No response received from server");
    } else {
      console.error("Error setting up the request", (error as Error).message);
    }

    throw error;
  }
}
export async function editStore(
  id: string,
  data: StoreData,
  authToken: string | null
) {
  try {
    const response = await axios.patch(url + `api/store/${id}`, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (Response) {
      console.error(
        "Server responded with non-2xx status",
        (error as any).response.data
      );
    } else if (Request) {
      console.error("No response received from server");
    } else {
      console.error("Error setting up the request", (error as Error).message);
    }

    throw error;
  }
}
