import React from 'react';
import { Box, Button, VStack, Stack} from '@chakra-ui/react';
import { SettingsIcon, EditIcon, RepeatClockIcon, InfoOutlineIcon, WarningTwoIcon } from '@chakra-ui/icons'
import UserIcon from '../UserIcon/UserIcon';

const ProfileCard = ({ title, text }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Stack direction={'row'} alignItems="center" spacing={6} justifyContent="center">
        <UserIcon imageUrl="https://institucional.ufpel.edu.br/cache/imagens/23291_API_INSTITUCIONAL_.jpg" title="Guilherme Netto" text="Morador" imageSize="100px" titleSize="lg" textSize="md" />
          <Button colorScheme='red' variant='ghost' size="2xl">
            <EditIcon boxSize="1.5em" />
          </Button>
        </Stack>


        <VStack spacing={4} align="stretch" mt="5">
          <Button rightIcon={<WarningTwoIcon />} colorScheme='red' variant='outline' justifyContent="space-between">
            Minhas Denúncias
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