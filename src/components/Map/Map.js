import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box, Flex } from '@chakra-ui/react';
import Search from '../Search/Search'; 

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

const libraries = ['places'];

const Map = () => {
  const [center, setCenter] = useState({ lat: -30.6946645, lng: -51.8112358 });
  const [zoom, setZoom] = useState(10);
  const [markers, setMarkers] = useState([]);
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setMarkers([{ lat: latitude, lng: longitude }]);
          setZoom(16);
        },
        () => {
          setCenter({ lat: -30.6946645, lng: -51.8112358 });
          setZoom(16);
        }
      );
    }
  }, []);

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      id: new Date().getTime()
    };
    setMarkers((current) => [...current, newMarker]);
  };
  

  const handlePlaceSelect = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setCenter({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
      setZoom(16);
    }
  };

  const handleMarkerClick = (id) => {
    setMarkers((current) => current.filter((marker) => marker.id !== id));
  };

  return (
    <LoadScript googleMapsApiKey="" libraries={libraries}>
       <Flex justify="flex-end">
        <Box position="absolute" top="10px" right="10px" zIndex="1">
          <Search onLoad={(autocomplete) => setAutocomplete(autocomplete)} onPlaceChanged={handlePlaceSelect} size="sm" />
        </Box>
      </Flex>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={mapOptions}
        onClick={handleMapClick}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker.id)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
