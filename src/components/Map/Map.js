import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
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

  return (
    <LoadScript googleMapsApiKey="" libraries={libraries}>
      <Search onLoad={(autocomplete) => setAutocomplete(autocomplete)} onPlaceChanged={handlePlaceSelect} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={zoom}
        options={mapOptions}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
