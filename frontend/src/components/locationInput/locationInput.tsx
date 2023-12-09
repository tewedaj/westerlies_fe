import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './style.locationinput.css';
interface LocationInputProps {
  callBack: (param: string, param2: string) => void;
}

function LocationInput({ callBack }: LocationInputProps) {
  const [city, setCity] = useState('');
  const [locations, setLocations] = useState([]);
  const [selected,setSelected ] = useState(false);
  const [apiKey] = useState('AIzaSyBXKcXjKnsuqS48iQOuXc-ruvr0vV8iCLs'); // Replace with your actual Google API key

  const handleCityChange = (e:any) => {
    const city = e.target.value;
    setCity(city);
  };

  const getCountry = async (place_id: string)=>{
  
      const endpoint = "https://maps.googleapis.com/maps/api/place/details/json";
      const params = {
        place_id: place_id,
        key: apiKey
      };

      const response = await axios.get(endpoint, { params });
      const data = response.data;
      var resData: any = {};
      console.log("RRRRR: ", response);
      for(var i = 0; i < data.result.address_components.length; i++) {
        if(data.result.address_components[i].types.includes('country')){
         resData.country = data.result.address_components[i].long_name;
        }
        if(data.result.address_components[i].types.includes('administrative_area_level_1')){
          resData.city = data.result.address_components[i].short_name
          ;
         }
        }
      return resData;
  }

  useEffect(() => {
    
if (city && !selected ) {
  // Use the Google Places API to fetch location predictions
  axios
    .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
      params: {
        input: city,
        key: apiKey,
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      const data = response.data;
      if (data.status === 'OK') {
        setLocations(data.predictions);
      } else {
        setLocations([]);
      }
    })
    .catch((error) => {
      console.error('Error fetching location predictions:', error);
    });
}else{
  setSelected(false);

}
  }, [city, apiKey]);

  const handleLocationSelect = async (location:any) => {
   var message : any= await getCountry(location.place_id);
  
  console.log("MESSAGE: ",message);
  callBack(message?.city,message?.country)


    setCity(location.description);
    setSelected(true);
    setLocations([]);

  };

  return (
    <div className={"locationSuggetion"}>
      <input
      className="locationInput"
        type="text"
        placeholder="ENTER LOCATION (e.g. city name, zip code)"
        value={city}
        onChange={handleCityChange}
      />
      <ul>
        {locations.map((location:any) => (
          <li
            key={location.place_id}
            onClick={() => handleLocationSelect(location)}
          >
            {location.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationInput;


//https://maps.googleapis.com/maps/api/place/autocomplete/json?input=addis&types=city&key=AIzaSyBXKcXjKnsuqS48iQOuXc-ruvr0vV8iCLs