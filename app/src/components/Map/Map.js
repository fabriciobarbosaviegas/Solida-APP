import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box, Flex } from '@chakra-ui/react';
import Search from '../Search/Search';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import PinDenuncia from '../../assets/PinDenuncia.svg';
import ReportForm from '../ReportForm/ReportForm';
import UserLocationPin from '../../assets/UserLocationPin.svg';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMarker, setNewMarker] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });
          setMarkers([{ lat: latitude, lng: longitude, isUserLocation: true }]);
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
    const marker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      id: new Date().getTime(),
    };
    setNewMarker(marker);
    setIsModalOpen(true);
  };

  const handleConfirmAddMarker = () => {
    setIsModalOpen(false);
    setIsFormOpen(true);
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

  const handleFormSubmit = (report) => {
    setMarkers((current) => [...current, newMarker]);
    setIsFormOpen(false);
    setNewMarker(null);
    // lógica para salvar a denúncia no banco de dados
    console.log('Denúncia registrada:', report);
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
            icon={marker.isUserLocation ? UserLocationPin : PinDenuncia}
            onClick={() => handleMarkerClick(marker.id)}
          />
        ))}
      </GoogleMap>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAddMarker}
      />
      <ReportForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialLocation={newMarker}
      />
    </LoadScript>
  );
};

export default Map;
