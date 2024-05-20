import React from 'react';
import { Box, Text, Card, Divider, CardBody, CardFooter, Stack, Heading } from '@chakra-ui/react';
import UserIcon from '../UserIcon/UserIcon';

const WariningCard = ({ title, ImgSrc, text }) => {
  return (
    <Card maxW='sm'>
      <Box
        bgImage={`url(${ImgSrc})`}
        bgPosition='center'
        bgRepeat='no-repeat'
        bgSize='cover'
        height='33vh'
      />
      <CardBody>
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{title}</Heading>
          <Text>
            {text}
          </Text>
        </Stack>
        <Stack alignItems="flex-start" mt='6' spacing='3'>
          <UserIcon imageUrl="https://institucional.ufpel.edu.br/cache/imagens/23291_API_INSTITUCIONAL_.jpg" title="Guilherme Netto" text="Morador" imageSize="50px" titleSize="sm" textSize="xs" />
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
      </CardFooter>
    </Card>
  );
};

export default WariningCard;
