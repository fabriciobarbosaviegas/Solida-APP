import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Map  from "./components/Map/Map";
import Sidebar from './components/Sidebar/Sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Sidebar></Sidebar>
    <Map />
  </React.StrictMode>
);

