import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import WarningCard from '../WarningCard/WarningCard';
import PinDenuncia from '../../assets/PinDenuncia.svg';

const MapPin = ({ latitude, longitude, reportId, title, ImgSrc, text, myReports, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <Marker
      position={{ lat: latitude, lng: longitude }}
      icon={PinDenuncia}
      onClick={handleToggleOpen}
    >
      {isOpen && (
        <InfoWindow onCloseClick={handleToggleOpen}>
          <WarningCard
            reportId={reportId}
            title={title}
            ImgSrc={ImgSrc}
            text={text}
            myReports={myReports}
            onClick={onClick}
          />
        </InfoWindow>
      )}
    </Marker>
  );
};

export default MapPin;
