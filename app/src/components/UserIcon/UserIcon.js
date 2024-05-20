import React from 'react';
import { Image, Box, Heading, Stack } from '@chakra-ui/react';


const UserIcon = ({ imageUrl, title, text, imageSize, titleSize }) => {
  return (
    <Stack direction={'row'} alignItems="center" spacing={6} justifyContent="center">
      <Image
        borderRadius='full'
        boxSize={imageSize}
        objectFit="cover"
        src={imageUrl}
        alt='Netto'
      />
      <Box d="flex" alignItems="baseline" justifyContent="center">
        <Heading size={titleSize}>{title}</Heading>
        <Box mt="1" fontWeight="semibold" as="p" lineHeight="tight" fontSize="md">
          {text}
        </Box>
      </Box>
    </Stack>
  );
};

export default UserIcon;
