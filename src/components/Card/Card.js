// Card.js
import React from 'react';
import { Image, Text, Card, Divider, CardBody, CardFooter, Stack, Heading} from '@chakra-ui/react';

const WariningCard = ({ title, ImgSrc, text }) => {
  return (
    <Card maxW='sm'>
  <CardBody>
    <Image
      src={ImgSrc}
      alt={title}
      borderRadius='lg'
    />
    <Stack mt='6' spacing='3'>
      <Heading size='md'>{title}</Heading>
      <Text>
        {text}
      </Text>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
  </CardFooter>
    </Card>
  );
};

export default WariningCard;
