import React from 'react';
import { Box, Image, Text, Card, Button, CardBody, CardFooter, Stack, Heading, Center } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import Local from '../../assets/Local.svg';

const WarningCard = ({ title, ImgSrc, text, myReports }) => {
  return (
    <Card mb={3}>
      <Box
        bgImage={`url(${ImgSrc})`}
        bgPosition='center'
        bgRepeat='no-repeat'
        bgSize='cover'
        height='33vh'
        rounded='md'
      />
      <CardBody>
        <Stack spacing='3'>
          <Heading size='md'>{title}</Heading>
          <Text>
            {text}
          </Text>
        </Stack>
      </CardBody>
      <Center>
        <CardFooter>
        {myReports ? (
            <>
              <Button mr={3} colorScheme='green' variant='outline' justifyContent="space-between" leftIcon={<CheckIcon />} >
                Marcar como resolvido
              </Button>
              <Button colorScheme='red' variant='outline' justifyContent="space-between" leftIcon={<Image src={Local} />} >
                Ver no Mapa
              </Button>
            </>
          ) : (
            <>
              <Button mr={3} colorScheme='green' variant='outline' justifyContent="space-between" leftIcon={<CheckIcon />} >
                Voluntariar
              </Button>
              <Button colorScheme='red' variant='outline' justifyContent="space-between" leftIcon={<Image src={Local} />} >
                Ver no Mapa
              </Button>
            </>
          )}
        </CardFooter>
      </Center>
    </Card>
  );
};

export default WarningCard;
