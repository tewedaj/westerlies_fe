import axios from "axios";

import { url } from "../../util/constant";
export interface StoreData {
  additionalInformation: string;
  addresses:             Address[];
  claimed:               boolean;
  currentAddress:        Address;
  description:           string;
  hasClass:              boolean;
  id:                    number;
  learnWithUs:           string;
  meetUs:                string;
  name:                  string;
  products:              Product[];
  profilePicture:        string;
  profileVideo:          string;
  rating:                number;
  storeType:             string;
  story:                 string;
  tags:                  Tag[];
  webPresences:          WebPresence[];
}

export interface Address {
  businessHours: BusinessHour[];
  email:         string;
  id:            number;
  location:      Location;
  phoneNumber:   string;
}

export interface BusinessHour {
  day:       string;
  endTime:   string;
  id:        number;
  open:      boolean;
  startTime: string;
}

export interface Location {
  city:         City;
  id:           number;
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
  countryName:      string;
  countryShortName: string;
  id:               number;
  mapAttribute:     MapAttribute;
}

export interface MapAttribute {
  id:        number;
  latitude:  number;
  longitude: number;
  name:      string;
  shortName: string;
  zoom:      number;
}

export interface Product {
  description: string;
  label:       string;
  value:       number;
}

export interface Tag {
  description: string;
  icon:        string;
  id:          number;
  tag:         string;
  tagType:     string;
}

export interface WebPresence {
  id:      number;
  link:    string;
  order:   number;
  webSite: string;
}


export function getStore(authToken: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(url + "api/store/?page=2&size=70", {
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
export async function addStore2(data: StoreData, authToken: string | null) {
  try {
    const response = await axios.post(
      url + "api/store/addStore",
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    if (Response) {
      console.error('Server responded with non-2xx status', (error as any).response.data);
    } else if (Request) {
      console.error('No response received from server');
    } else {
      console.error('Error setting up the request', (error as Error).message);
    }

    throw error;
  }
}
export const addStore = async (data: StoreData , authToken: string) => {
  try {
    const response = await fetch('https://apibeta.westerlies.com/api/store/addStore', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
        // Add any other headers if required
      },
      body: JSON.stringify(data), 
    });

    if (!response.ok) {
      // Handle error responses
      console.error('Failed to submit the form:', response.statusText);
      throw new Error('Failed to submit the form');
    }

    // Handle success responses
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('An error occurred while submitting the form:', error);
    throw error;
  }
};