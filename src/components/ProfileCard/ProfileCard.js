import React from 'react';
import { Box, Button, VStack, Heading, Stack, Image } from '@chakra-ui/react';
import { SettingsIcon, EditIcon, RepeatClockIcon, InfoOutlineIcon, WarningTwoIcon } from '@chakra-ui/icons'

const ProfileCard = ({ title, text }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Stack direction={'row'} alignItems="center" spacing={6} justifyContent="center">
          <Image
            borderRadius='full'
            boxSize='100px'
            objectFit="cover"
            src='https://institucional.ufpel.edu.br/cache/imagens/23291_API_INSTITUCIONAL_.jpg'
            alt='Netto'
          />
          <Box d="flex" alignItems="baseline" justifyContent="center">
            <Heading size="lg">{title}</Heading>
            <Box mt="1" fontWeight="semibold" as="p" lineHeight="tight" fontSize="md">
              {text}
            </Box>
          </Box>
          <Button colorScheme='red' variant='ghost' size="2xl">
            <EditIcon boxSize="1.5em" />
          </Button>
        </Stack>


        <VStack spacing={4} align="stretch" mt="5">
          <Button rightIcon={<WarningTwoIcon />} colorScheme='red' variant='outline' justifyContent="space-between">
            Minhas Denúncias
          </Button>
          <Button rightIcon={<RepeatClockIcon />} colorScheme='red' variant='outline' justifyContent="space-between">
            Histórico
          </Button>
          <Button rightIcon={<SettingsIcon />} colorScheme='red' variant='outline' justifyContent="space-between">
            Configurações
          </Button>
          <Button rightIcon={<InfoOutlineIcon />} colorScheme='red' variant='outline' justifyContent="space-between">
            Sobre
          </Button>
          <Button colorScheme='red'>
            Sair da conta
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileCard;