// Icon.js
import React from 'react';
import { Box, Image, Text, useBreakpointValue } from '@chakra-ui/react';

const Icon = ({ ImgSrc, text, onClick }) => {
  const size = useBreakpointValue({ base: "1.75rem", sm: "1rem", md: "1.75rem", lg: "3rem" });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" m="0.25rem auto 0.75rem" onClick={onClick}>
      <Image src={ImgSrc} alt={text} boxSize={size} />
      <Text textAlign="center" fontSize="12px" minH="20px">{text}</Text>
    </Box>
  );
};

export default Icon;
