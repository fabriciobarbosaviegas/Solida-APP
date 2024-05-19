import React from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Input } from '@chakra-ui/react';

const Search = ({ onLoad, onPlaceChanged, size }) => (
  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
    <Input type="text" placeholder="Search for places..." size={size} borderRadius="md" bg="white" />
  </Autocomplete>
);

export default Search;
