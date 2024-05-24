import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, VStack, Stack, Center, Spinner, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';import { WarningTwoIcon, DeleteIcon } from '@chakra-ui/icons';
import UserIcon from '../UserIcon/UserIcon';
import { useAuth } from '../../contexts/AuthContext';
import { getPhotoByUserId, getUserById, deleteUser} from '../../services/AuthService';

const ProfileCard = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const cancelRef = useRef();

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
  
  const openAlert = () => setIsAlertOpen(true);
  const closeAlert = () => setIsAlertOpen(false);

  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Box p="6">
        <Stack direction={'row'} alignItems="center" spacing={6} justifyContent="center">
          <UserIcon
            src={photoUrl}
            title={user.fullName}
            text={user.type === 0 ? 'Morador' : 'Força de Segurança'}
            size="xl"
            titleSize="lg"
            textSize="md"
          />
        </Stack>
        <VStack spacing={4} align="stretch" mt="5">
          <Button rightIcon={<WarningTwoIcon />} colorScheme='red' variant='outline' justifyContent="space-between">
            Minhas Denúncias
          </Button>
          <Button rightIcon={<DeleteIcon />} onClick={openAlert} colorScheme='red' variant='outline' justifyContent="space-between">
            Deletar Conta
          </Button>
          <Button colorScheme='red' onClick={logout}>
            Sair da conta
          </Button>
        </VStack>
      </Box>
      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Deletar Conta
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={closeAlert}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDeleteUser} ml={3}>
                Deletar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
    </AlertDialog>
    </Box>
  );
};

export default ProfileCard;
