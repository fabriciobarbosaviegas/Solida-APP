import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { Input, InputGroup, InputRightAddon, Button } from '@chakra-ui/react';
import { Search2Icon } from "@chakra-ui/icons";

const Search = ({ onLoad, onPlaceChanged, handleButtonClick, size }) => {
  const inputRef = useRef(null);

  return (
    <Autocomplete onLoad={(autocomplete) => onLoad(autocomplete, inputRef)} onPlaceChanged={onPlaceChanged}>
      <InputGroup borderRadius="2xl" size={size}>
        <Input
          type="text"
          placeholder="Pesquisar lugar..."
          size={size}
          borderRadius="2xl"
          bg="white"
          ref={inputRef}
        />
        <InputRightAddon p={0} border="none" borderRadius="2xl">
          <Button
            size="sm"
            borderLeftRadius={0}
            borderRightRadius="2xl"
            bg="white"
            onClick={handleButtonClick}
          >
            <Search2Icon color="gray.600" />
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Autocomplete>
  );
};


export default Search;
