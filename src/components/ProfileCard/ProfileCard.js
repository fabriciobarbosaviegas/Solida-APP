// ProfileCard.js
import React from 'react';
import { Icon, Box, Button, VStack, Heading, Stack } from '@chakra-ui/react';
import { SettingsIcon, EditIcon, RepeatClockIcon, InfoOutlineIcon, WarningTwoIcon, createIcon  } from '@chakra-ui/icons'
import WarningIcon from '../../assets/DenunciaIcon.svg'

const ProfileCard = ({ title, text }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Stack direction={'row'}>
          <Box d="flex" alignItems="baseline">
            <Heading size="xl">{title}</Heading>
          </Box>

          <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
            {text}
          </Box>

        </Stack>

        <VStack spacing={4} align="stretch" mt="5">
          <Button rightIcon={<WarningTwoIcon />} colorScheme='red' variant='outline'>
            Minhas Denúncias
          </Button>
          <Button rightIcon={<RepeatClockIcon />} colorScheme='red' variant='outline'>
            Histórico
          </Button>
          <Button rightIcon={<SettingsIcon />} colorScheme='red' variant='outline'>
            Configurações
          </Button>
          <Button rightIcon={<InfoOutlineIcon />} colorScheme='red' variant='outline'>
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
