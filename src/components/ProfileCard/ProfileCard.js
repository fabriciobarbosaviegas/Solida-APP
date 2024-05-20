import React from 'react';
import { Box, Button, VStack, Heading, Stack, Image } from '@chakra-ui/react';
import { SettingsIcon, EditIcon, RepeatClockIcon, InfoOutlineIcon, WarningTwoIcon  } from '@chakra-ui/icons'

const ProfileCard = ({ title, text }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Stack direction={'row'} spacing={6}>
            <Image
              borderRadius='full'
              boxSize='150px'
              src='https://institucional.ufpel.edu.br/cache/imagens/23291_API_INSTITUCIONAL_.jpg'
              alt='Netto'
            />
            <Box d="flex" alignItems="baseline">
              <Heading size="xl">{title}</Heading>
              <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                {text}
              </Box>
            </Box>
            <Button colorScheme='teal' variant='ghost'>
              <EditIcon />
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