import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import Map from "./components/Map/Map";
import Sidebar from './components/Sidebar/Sidebar';
import AuthForm from './components/AuthForm/AuthForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const App = () => {
  const { isAuthenticated } = useAuth();
  

  return (
    <ChakraProvider>
      {isAuthenticated ? (
        <>
          <Sidebar />
          <Map />
        </>
      ) : (
        <AuthForm />
      )}
    </ChakraProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);