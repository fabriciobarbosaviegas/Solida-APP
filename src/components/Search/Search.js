import React from 'react';
import { Autocomplete } from '@react-google-maps/api';

const Search = ({ onLoad, onPlaceChanged }) => (
  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
    <input type="text" placeholder="Search for places..." />
  </Autocomplete>
);

export default Search;
