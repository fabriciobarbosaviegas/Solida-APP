import React from 'react';
import { Avatar, Box, Heading, Stack } from '@chakra-ui/react';


const UserIcon = ({ src, title, text, size, titleSize }) => {
  return (
    <Stack direction={'row'} alignItems="center" spacing={6} justifyContent="center">
      <Avatar src={src} size={size} alt={title}></Avatar>
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
