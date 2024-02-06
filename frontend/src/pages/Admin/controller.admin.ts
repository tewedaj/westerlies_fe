import axios from "axios";

import { url } from "../../util/constant";
export interface StoreData {
  id?: number,
  additionalInformation: string;
  primaryTag:            Tag;
  googleReviewUrl:       string;
  addresses:             Address[];
  claimed:               boolean;
  currentAddress:        null;
  description:           string;
  hasClass:              boolean;
  learnWithUs:           string;
  meetUs:                string;
  name:                  string;
  products:              Product[];
  profilePicture:        string;
  profileVideo:          string;
  storeType:             string;
  story:                 string;
  tags:                  Tag[];
  webPresences:          WebPresence[];
}
export interface StoreEditData {
  id?: number,
  additionalInformation: string;
  description:           string;
  hasClass:              boolean;
  learnWithUs:           string;
  name:                  string;
  profilePicture:        string;
}

export interface Address {
  id?: number;
  email: string;
  location: Location;
  phoneNumber: string;
  businessHours: BusinessHour[];
}
export interface AddressEdit {
  email:         string;
  phoneNumber:   string;
}
export interface BusinessHour {
  id?: number;
  day: string;
  endTime: string;
  open: boolean;
  startTime: string;
}
export interface Location {
  id?: number;
  city: City;
  latitude: number;
  longitude: number;
  route: string;
  secondStreet: string;
  state: string;
  street: string;
  tip: string;
  zip: string;
}
export interface LocationEdit {
  id?: number;
  city:        {countryName:string,
    countryShortName: string;
    mapAttribute:     {latitude:  number;
  longitude: number;
  name:      string;
  shortName: string;
  zoom:      number;};} ;
  latitude:     number;
  longitude:    number;
  route:        string;
  secondStreet: string;
  state:        string;
  street:       string;
  tip:          string;
  zip:          string;
}

export interface City {
  countryName:string,
  countryShortName: string;
  mapAttribute:     MapAttribute;
}

export interface MapAttribute {
  latitude:  number;
  longitude: number;
  name:      string;
  shortName: string;
  zoom:      number;
}

export interface Tag {
  id?:         number;
  tag:         string;
  description: string;
  icon:        string;
  tagType:     string;
}

export interface Product {
  description: string;
  label:       string;
  value:       number;
}

export interface WebPresence {
  id?: number;
  link:    string;
  webSite: string;
}
export interface WebPresenceEdit {
  link:    string;
}
const authToken = localStorage.getItem('authToken');
export function getStore() {
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
export function searchStoreByname( storeName: string) {
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

export async function deleteStore( id: string) {
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
export async function addStore(data: StoreData) {
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

export function getTag() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(url + "api/tag/?page=0&size=20", {
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

export function getStoreById( storeId: number) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(
        url + `api/store/${storeId}`,
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
export async function editStoreParts(
  id: string,
  data: StoreEditData
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
export async function editAddressParts(
  id: string,
  data: AddressEdit
) {
  try {
    const response = await axios.patch(url + `api/address/${id}`, data, {
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
export async function deleteAddressParts(
  id: string
) {
  try {
    const response = await axios.delete(url + `api/address/${id}`, {
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
export async function addAddressParts(
  id: string,
  data: Address
) {
  try {
    const response = await axios.post(url + `api/address/${id}`, data, {
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
export async function editAddressLocationParts(
  id: string,
  data: LocationEdit
) {
  try {
    const response = await axios.patch(url + `api/address/location/${id}`, data, {
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
export async function editAddressBusinessHourParts(
  id: string,
  data: BusinessHour
) {
  try {
    const response = await axios.patch(url + `api/address/businessHours/${id}`, data, {
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
export async function editWebpresenceParts(
  id: string,
  data: WebPresenceEdit
) {
  try {
    const response = await axios.patch(url + `api/webPresence/${id}`, data, {
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
export async function deleteWebpresenceParts(
  id: string,
) {
  try {
    const response = await axios.delete(url + `api/webPresence/${id}`, {
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
export async function addTagParts(
  id: string,
  tagId: string
) {
  try {
    const response = await axios.put(url + `api/store/${id}/addTag/${tagId}`, {
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
export async function removeTagParts(
  id: string,
  tagId: string
) {
  try {
    const response = await axios.delete(url + `api/store/${id}/removeTag/${tagId}`, {
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