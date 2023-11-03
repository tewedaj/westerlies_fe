import React, { useState, useEffect } from 'react';

function LocationInput() {
  const [city, setCity] = useState('');
  const [locations, setLocations] = useState([]);
  const [apiKey] = useState('AIzaSyC1kPbOVNuVyI4TTxbW0Pbniz_b5wNRdH0'); // Replace with your actual Google API key

  const handleCityChange = (e:any) => {
    const city = e.target.value;
    setCity(city);
  };

  useEffect(() => {
    if (city) {
      // Use the Google Places API to fetch location predictions
      fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 'OK') {
            setLocations(data.predictions);
          } else {
            setLocations([]);
          }
        })
        .catch((error) => {
          console.error('Error fetching location predictions:', error);
        });
    }
  }, [city, apiKey]);

  const handleLocationSelect = (location:any) => {
    setCity(location.description);
    setLocations([]);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a city"
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
