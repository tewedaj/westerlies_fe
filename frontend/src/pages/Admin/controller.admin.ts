import axios from "axios";

import { url } from "../../util/constant";
export interface StoreData {
  storeType:             string;
  name:                  string;
  addresses:             Address[];
  id:                    number;
  story:                 string;
  meetUs:                string;
  description:           string;
  learnWithUs:           string;
  webPresences:          WebPresence[];
  products:              any[];
  tags:                  Tag[];
  profilePicture:        string;
  profileVideo:          string;
  additionalInformation: null;
  rating:                number;
  hasClass:              boolean;
  currentAddress:        null;
  claimed:               boolean;
}
export interface Address {
  id:            number;
  phoneNumber:   string;
  email:         string;
  location:      Location;
  businessHours: BusinessHour[];
}

export interface BusinessHour {
  id:        number;
  day:       string;
  startTime: string;
  endTime:   string;
  open:      boolean;
}

export interface Location {
  id:           number;
  longitude:    number;
  latitude:     number;
  city:         City;
  street:       string;
  secondStreet: null;
  state:        string;
  route:        null;
  zip:          string;
  tip:          string;
}

export interface City {
  id:               number;
  countryName:      string;
  countryShortName: null;
  mapAttribute:     MapAttribute;
}

export interface MapAttribute {
  id:        number;
  name:      string;
  shortName: string;
  longitude: number;
  latitude:  number;
  zoom:      number;
}

export interface Tag {
  id:          number;
  tag:         string;
  description: null | string;
  tagType:     TagType;
  icon:        null | string;
}

export enum TagType {
  Business = "BUSINESS",
  Product = "PRODUCT",
}

export interface WebPresence {
  id:      number;
  webSite: string;
  link:    string;
  order:   number;
}

export function getStore(authToken: string) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(url + "api/store/?page=10&size=10", {
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