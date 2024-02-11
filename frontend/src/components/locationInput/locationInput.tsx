import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './style.locationinput.css';
interface LocationInputProps {
  callBack: (param: string, param2: string) => void;
}


const requestPlaceAutocomplete = (query:string) => {
  // Generate a unique callback function name
  const callbackName = 'handlePlaceResponse';

  // Create a script element
  const script = document.createElement('script');

  // Set the source URL with the Place Autocomplete API endpoint and parameters
  script.src = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=AIzaSyDJmqRKafG0fWbgp-emUx3PuE1IQp_7F6U&callback=${callbackName}`;

  // Append the script to the document body
  document.body.appendChild(script);

  // Clean up after the script has loaded
  script.onload = () => {
    document.body.removeChild(script);
  };
};


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
        key: "AIzaSyDJmqRKafG0fWbgp-emUx3PuE1IQp_7F6U"
      };

      const response = await axios.get(endpoint, { params });
 
      const data = response.data;
      var resData = {};
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
    .get(`https://apibeta.westerlies.com/api/search/city?key=${city}&page=0&size=100`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
     // alert("RESPONSE: "+JSON.stringify(response.data))
     setLocations(response.data);

      // const data = response.data;
      // if (data.status === 'OK') {
      //   setLocations(data);
      // } else {
      //   setLocations([]);
      // }
    })
    .catch((error) => {
      console.error('Error fetching location predictions:', error);
    });
}else{
  setSelected(false);

}
  }, [city, apiKey]);

  const handleLocationSelect = async (location:any) => {
  // var message : any= await getCountry(location.place_id);
  
  callBack(location?.mapAttribute?.shortName,location?.countryName)


    setCity(location?.mapAttribute?.shortName);
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
            key={location.id}
            onClick={() => handleLocationSelect(location)}
          >
            {location.mapAttribute.shortName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LocationInput;


//https://maps.googleapis.com/maps/api/place/autocomplete/json?input=addis&types=city&key=AIzaSyBXKcXjKnsuqS48iQOuXc-ruvr0vV8iCLs