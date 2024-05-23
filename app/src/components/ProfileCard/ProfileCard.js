import React, { useState, useEffect } from 'react';
import { Box, Button, VStack, Stack, Spinner, Center } from '@chakra-ui/react';
import { WarningTwoIcon, DeleteIcon } from '@chakra-ui/icons';
import UserIcon from '../UserIcon/UserIcon';
import { useAuth } from '../../contexts/AuthContext';
import { getPhotoByUserId, getUserById, deleteUser} from '../../services/AuthService';

const ProfileCard = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');

  const fetchUserData = async () => {
    const currentUser = localStorage.getItem('userId');
    if (currentUser) {
      try {
        const userData = await getUserById(currentUser);
        setUser(userData);
        const photoData = await getPhotoByUserId(currentUser);
        setPhotoUrl(photoData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  const handleDeleteUser = async () => {
    const currentUser = localStorage.getItem('userId');
    if (currentUser) {
      try {
        await deleteUser(currentUser);
        logout();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };
  
  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) {
    return <Center h='100%'><Spinner color='red.500' size='xl' /></Center>;
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Stack direction={'row'} alignItems="center" spacing={6} justifyContent="center">
          <UserIcon
            src={photoUrl}
            title={user.fullName}
            text={user.type === 0 ? 'Morador' : 'Força de Segurança'}
            imageSize="100px"
            titleSize="lg"
            textSize="md"
          />
        </Stack>
        <VStack spacing={4} align="stretch" mt="5">
          <Button rightIcon={<WarningTwoIcon />} colorScheme='red' variant='outline' justifyContent="space-between">
            Minhas Denúncias
          </Button>
          <Button rightIcon={<DeleteIcon />} onClick={handleDeleteUser} colorScheme='red' variant='outline' justifyContent="space-between">
            Deletar Conta
          </Button>
          <Button colorScheme='red' onClick={logout}>
            Sair da conta
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileCard;
