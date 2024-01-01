// GoogleMapPicker.js
import { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const GoogleMapPicker = (props: any, callBack: (lat: string, lng: string) => {}) => {
  const [selectedLocation, setSelectedLocation] = useState({ lat: "", lng: "" });

  const mapStyles = {
    width: '100%',
    height: '100%',
    position: 'relative',
  };

  return (
    <Map
      google={props.google}
      style={mapStyles}
      onClick={(t: any, map: any, coord: any) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        
        // Update the selected location state
        setSelectedLocation({ lat: String(lat), lng: String(lng) });

        // Callback function to pass the selected location to the parent component
        callBack(lat, lng);
      }}
      initialCenter={{
        lat: "40.712776",
        lng: "-74.005974",
      }}
    />
  );
};

export default GoogleApiWrapper({
  apiKey:'AIzaSyBXKcXjKnsuqS48iQOuXc-ruvr0vV8iCLs',
})(GoogleMapPicker);
