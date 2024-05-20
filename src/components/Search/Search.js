import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Input } from '@chakra-ui/react';

const Search = ({ onLoad, onPlaceChanged, size }) => (
  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
    <Input type="text" placeholder="Pesquisar lugar..." size={size} borderRadius="2xl" bg="white" boxShadow='2xl' />
  </Autocomplete>
);

export default Search;
