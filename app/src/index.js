import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Map  from "./components/Map/Map";
import Sidebar from './components/Sidebar/Sidebar';
import { ChakraProvider } from '@chakra-ui/react'
import AuthForm from './components/AuthForm/AuthForm';



const App = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
 
   const handleLogin = (credentials) => {
     // Lógica para autenticação
     console.log('Login:', credentials);
     setIsAuthenticated(true);
   };
 
   const handleSignup = (credentials) => {
     // Lógica para cadastro
     console.log('Signup:', credentials);
     setIsAuthenticated(true);
   };
 
   return (
     <ChakraProvider>
       {isAuthenticated ? (
         <>
           <Sidebar />
           <Map />
         </>
       ) : (
         <AuthForm onLogin={handleLogin} onSignup={handleSignup} />
       )}
     </ChakraProvider>
   );
 };
 
 const root = ReactDOM.createRoot(document.getElementById('root'));
 root.render(
   <React.StrictMode>
     <App />
   </React.StrictMode>
 );