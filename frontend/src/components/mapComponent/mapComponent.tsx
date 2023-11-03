import React, { useEffect } from 'react';

const GoogleMap = ({ apiKey, initialCenter, zoom }) => {
  useEffect(() => {
    // Load the Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;

    script.addEventListener('load', () => {
      // Initialize the map once the API is loaded
      new window.google.maps.Map(document.getElementById('map'), {
        center: initialCenter,
        zoom: zoom,
      });
    });

    document.body.appendChild(script);

    return () => {
      // Clean up the script tag to avoid memory leaks
      document.body.removeChild(script);
    };
  }, [apiKey, initialCenter, zoom]);

  return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default GoogleMap;
