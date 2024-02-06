// GoogleMapPicker.js
import { useEffect, useState } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const GoogleMapPicker = ({ google, index, callBack, onAddressChange }: any) => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: "40.712776", // Default latitude (New York City)
    lng: "-74.005974", // Default longitude (New York City)
  });
  const [address, setAddress] = useState(""); // State to store the formatted address
  const mapStyles = {
    width: "100%",
    height: "100%",
    position: "relative",
  };

  useEffect(() => {
    // Perform reverse geocoding when the selected location changes
    if (selectedLocation.lat !== "" && selectedLocation.lng !== "") {
      const geocoder = new google.maps.Geocoder();
      const latLng = {
        lat: parseFloat(selectedLocation.lat),
        lng: parseFloat(selectedLocation.lng),
      };

      geocoder.geocode({ location: latLng }, (results: any, status: any) => {
        if (status === "OK") {
          if (results[0]) {
            setAddress(results[0].formatted_address);
            onAddressChange(results[0].formatted_address, index);
          }
        } else {
          console.log("Geocoder failed due to: " + status);
        }
      });
    }
  }, [selectedLocation, google, onAddressChange, index]);

  const handleMapClick = (_: any, __: any, coord: { latLng: any }) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    setSelectedLocation({ lat: lat.toString(), lng: lng.toString() });
    // Parse latitude and longitude as floats
    const parsedLat = parseFloat(lat);
    const parsedLng = parseFloat(lng);

    // Call the callBack function with parsed latitude and longitude
    callBack(parsedLat, parsedLng);

    // Update the address state immediately when the user clicks on the map
    const geocoder = new google.maps.Geocoder();
    const latLngObj = new google.maps.LatLng(lat, lng);

    geocoder.geocode(
      { location: latLngObj },
      (results: { formatted_address: any }[], status: string) => {
        if (status === "OK" && results[0]) {
          setAddress(results[0].formatted_address);
          onAddressChange(results[0].formatted_address, index);
        } else {
          console.log("Reverse geocoding failed due to: " + status);
        }
      }
    );
  };

  return (
    <>
      <Map
        google={google}
        style={mapStyles}
        onClick={handleMapClick}
        initialCenter={selectedLocation}
      />
      <div>Address: {address}</div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBXKcXjKnsuqS48iQOuXc-ruvr0vV8iCLs",
})(GoogleMapPicker);

//apiKey:'AIzaSyBXKcXjKnsuqS48iQOuXc-ruvr0vV8iCLs',
