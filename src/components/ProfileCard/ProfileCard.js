// ProfileCard.js
import React from 'react';
import { Box, Button, VStack, Heading } from '@chakra-ui/react';

const ProfileCard = ({ title, text }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Heading size="xl">{title}</Heading>
        </Box>

        <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
          {text}
        </Box>

        <VStack spacing={4} align="stretch" mt="5">
          <Button colorScheme="teal">Button 1</Button>
          <Button colorScheme="teal">Button 2</Button>
          <Button colorScheme="teal">Button 3</Button>
          <Button colorScheme="teal">Button 4</Button>
          <Button colorScheme="teal">Button 5</Button>
          <Button colorScheme="teal">Button 6</Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileCard;
