import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, Button, VStack, Stack, Center, Spinner, AlertDialog, 
  AlertDialogBody, AlertDialogFooter, AlertDialogHeader, 
  AlertDialogContent, AlertDialogOverlay, Drawer, DrawerBody, 
  DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure 
} from '@chakra-ui/react';
import { WarningTwoIcon, DeleteIcon } from '@chakra-ui/icons';
import UserIcon from '../UserIcon/UserIcon';
import { useAuth } from '../../contexts/AuthContext';
import { getPhotoByUserId, getUserById, deleteUser } from '../../services/AuthService';
import { getUserReports, getReportPhoto } from '../../services/ReportService';
import WarningCard from '../WarningCard/WarningCard';
import Geleira from '../../assets/Geleira.png';

const ProfileCard = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const cancelRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const fetchUserReports = async () => {
    const currentUser = localStorage.getItem('userId');
    if (currentUser) {
      setLoadingReports(true);
      try {
        const userReports = await getUserReports(currentUser);
        console.log(userReports)

        // Buscar a primeira imagem para cada relatório
        const token = localStorage.getItem('token');
        const reportsWithImages = await Promise.all(userReports.map(async (report) => {
          let imageUrl = Geleira;
          if (report.imageUrl) {
            const imageUrls = report.imageUrl.split(',');
            if (imageUrls.length > 0) {
              imageUrl = await getReportPhoto(report.id, token);
            }
          }
          return { ...report, imageUrl };
        }));

        setReports(reportsWithImages);
      } catch (error) {
        console.error('Error fetching user reports:', error);
      } finally {
        setLoadingReports(false);
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
          <Button 
            rightIcon={<WarningTwoIcon />} 
            colorScheme='red' 
            variant='outline' 
            justifyContent="space-between"
            onClick={() => {
              fetchUserReports();
              onOpen();
            }}
          >
            Minhas Denúncias
          </Button>
          <Button 
            rightIcon={<DeleteIcon />} 
            onClick={openAlert} 
            colorScheme='red' 
            variant='outline' 
            justifyContent="space-between"
          >
            Deletar Conta
          </Button>
          <Button colorScheme='red' onClick={logout}>
            Sair da conta
          </Button>
        </VStack>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader boxShadow="base">
              <Center>Minhas Denúncias</Center>
            </DrawerHeader>
            <DrawerBody>
              {loadingReports ? (
                <Center h='100%'><Spinner color='red.500' size='xl' /></Center>
              ) : (
                reports.map((report) => (
                  <WarningCard
                    reportId={report.id}
                    title={report.title}
                    ImgSrc={report.imageUrl}
                    text={report.description}
                    myReports={true}
                  />
                ))
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>

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
