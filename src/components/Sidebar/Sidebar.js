import React from 'react';
import './Sidebar.css';
import Icon from '../Icon/Icon';
import WarningIcon from '../../assets/DenunciaIcon.svg'
import MapIcon from '../../assets/MapIcon.svg'
import UserIcon from '../../assets/UserIcon.svg'


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Icon ImgSrc={MapIcon} text={"Mapa"}  className="top-button"/>
      <Icon ImgSrc={WarningIcon} text={"Denuncias"}  className="top-button" />
      <div className="spacer" />
      <Icon ImgSrc={UserIcon} text={"Você"}  className="botton-button"/>

    </div>
  );
};

export default Sidebar;
