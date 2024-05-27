import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Box, Flex } from '@chakra-ui/react';
import Search from '../Search/Search';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ReportForm from '../ReportForm/ReportForm';
import UserLocationPin from '../../assets/UserLocationPin.svg';
import { getReports, getReportPhoto } from '../../services/ReportService';
import MapPin from '../MapPin/MapPin'; 
import Geleira from '../../assets/Geleira.png';

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
    const storedMarkers = JSON.parse(localStorage.getItem('markers')) || [];
    const userLocationMarker = JSON.parse(localStorage.getItem('userLocation'));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocationMarker = {
            lat: latitude,
            lng: longitude,
            isUserLocation: true,
            id: 'user-location',
          };
          setCenter({ lat: latitude, lng: longitude });
          setZoom(16);
          localStorage.setItem('userLocation', JSON.stringify(userLocationMarker));
          setMarkers([userLocationMarker, ...storedMarkers]);
        },
        () => {
          setCenter({ lat: -30.6946645, lng: -51.8112358 });
          setZoom(16);
          setMarkers([userLocationMarker, ...storedMarkers]);
        }
      );
    } else {
      setMarkers([userLocationMarker, ...storedMarkers]);
    }

    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const reports = await getReports(token);

        const reportMarkers = await Promise.all(reports.map(async (report) => {
          const cords = JSON.parse(report.cords);
          
          let imageUrl = Geleira;

          if (report.imageUrl) {
            const imageUrls = report.imageUrl.split(',');
            if (imageUrls.length > 0) {
              try {
                imageUrl = await getReportPhoto(report.id, token);
              } catch (error) {
                console.error(`Error fetching image for report ${report.id}`, error);
              }
            }
          }

          return {
            lat: cords.lat,
            lng: cords.lng,
            id: report.id,
            title: report.title,
            ImgSrc: imageUrl,
            text: report.text,
            myReports: report.myReports,
          };
        }));

        setMarkers((prevMarkers) => [...prevMarkers, ...reportMarkers]);
        localStorage.setItem('markers', JSON.stringify([...storedMarkers, ...reportMarkers]));
      } catch (error) {
        console.error('Error fetching reports', error);
      }
    };

    fetchReports();
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
    if (id !== 'user-location') {
      const updatedMarkers = markers.filter((marker) => marker.id !== id);
      setMarkers(updatedMarkers);
      localStorage.setItem('markers', JSON.stringify(updatedMarkers));
    }
  };

  const handleFormSubmit = (report) => {
    const cords = JSON.parse(report.cords);
    const newReportMarker = {
      lat: cords.lat,
      lng: cords.lng,
      id: report.id,
      title: report.title,
      ImgSrc: report.ImgSrc,
      text: report.text,
      myReports: report.myReports,
    };

    const updatedMarkers = [...markers, newReportMarker];
    setMarkers(updatedMarkers);
    localStorage.setItem('markers', JSON.stringify(updatedMarkers));
    setIsFormOpen(false);
    setNewMarker(null);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={libraries}>
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
        {markers.map((marker) =>
          marker.isUserLocation ? (
            <Marker
              key={marker.id}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={UserLocationPin}
            />
          ) : (
            <MapPin
              key={marker.id}
              latitude={marker.lat}
              longitude={marker.lng}
              reportId={marker.id}
              title={marker.title}
              ImgSrc={marker.ImgSrc}
              text={marker.text}
              myReports={marker.myReports}
              mapPin={true}
              onClick={() => handleMarkerClick(marker.id)}
            />
          )
        )}
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
