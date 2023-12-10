// GoogleMap.js
import  { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const GoogleMap = (props: any,_locations : LocationMap[]) => {
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [selectedPlaceImage, setSelectedPlaceImage] = useState("");

  useEffect(()=>{
  console.log("LOCATION :", JSON.stringify(props.locations));

  },[])


  const onMarkerClick = (props: any, marker:any, _e:any,profilePicture: any) => {
    setActiveMarker(marker);
    setSelectedPlaceImage(profilePicture.profilePicture?.replace("api.westerlies.io","apibeta.westerlies.com").replace("http://","https://"));
    setSelectedPlace(props);
    setShowingInfoWindow(true);
  };

  const onClose = () => {
    if (showingInfoWindow) {
      setActiveMarker({});
      setShowingInfoWindow(false);
    }
  };

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={{
        lat: props.locations[0]?.latitude ,
        lng: props.locations[0]?.longitude,
      }}
    >

      {props?.locations.map((loc:any)=>{
        return(
          <Marker
            position={{ lat: loc.latitude, lng: loc.longitude }}
            onClick={(props,marker,e)=>{
              onMarkerClick(props,marker,e,loc)
            }}
            name={loc.name}
          />
        )
      })}
     

      <InfoWindow
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={onClose}
      >
        <div>
          <div style={{width:'100%',overflow:'hidden', height:50}}>

          <img src={selectedPlaceImage}   alt="Shop" />
          </div>
          <h4>{selectedPlace.name}</h4>
          <button style={{padding:5, background:'#06876',borderRadius:5,border:'none'}}>
            Detail
          </button>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBXKcXjKnsuqS48iQOuXc-ruvr0vV8iCLs',
})(GoogleMap);
