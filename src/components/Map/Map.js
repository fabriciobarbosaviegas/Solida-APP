import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100vh',
};

const mapOptions = {
  disableDefaultUI: true, // Desativa todos os controles padrão
  zoomControl: true, // Ativa o controle de zoom, se necessário
};

const libraries = ['places'];

const Map = () => {
  const[center, setCenter] = useState({lat:-30.6946645, lng:-51.8112358})
  const [zoom, setZoom] = useState(10);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setZoom(16);
        },
        () => {
          setCenter({ lat:-30.6946645, lng:-51.8112358 });
          setZoom(16);
        }
      );
    }
  }, []);

  const handleMapClick = (event) => {
    const newMarker = {
      lat: event.latLng.lat(),
      lng:  event.latLng.lng(),
    };
    setMarkers((current) => [...current, newMarker]);
  };

  return (
    <LoadScript googleMapsApiKey="" libraries={libraries}>
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