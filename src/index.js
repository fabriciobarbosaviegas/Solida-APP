import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Map  from "./components/Map/Map";
import Sidebar from './components/Sidebar/Sidebar';
import { ChakraProvider } from '@chakra-ui/react'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <ChakraProvider>
        <Sidebar></Sidebar>
        <Map />
     </ChakraProvider>
  </React.StrictMode>
);

