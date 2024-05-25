import React, { useState, useEffect } from 'react';
import { Box, Spacer, useBreakpointValue, Flex, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Center } from '@chakra-ui/react';
import WarningCard from '../WarningCard/WarningCard';
import ProfileCard from '../ProfileCard/ProfileCard';
import Icon from '../Icon/Icons';
import WarningIcon from '../../assets/DenunciaIcon.svg';
import MapIcon from '../../assets/MapIcon.svg';
import UserIcon from '../../assets/UserIcon.svg';
import Geleira from '../../assets/Geleira.png';
import { getReports } from '../../services/ReportService'; 
import {getUserById} from '../../services/AuthService';

const SidebarBox = ({ children, ...props }) => (
  <Box
    position="fixed"
    left={0}
    bottom={0}
    height={{ base: "10%", md: "100%" }}
    width={{ base: "100%", md: "8%" }}
    display="flex"
    padding={4}
    boxSizing="border-box"
    zIndex={5}
    backgroundColor="white"
    {...props}
  >
    {children}
  </Box>
);

const Sidebar = () => {
  const direction = useBreakpointValue({ base: "row", md: "column" });
  const align = useBreakpointValue({ base: "center", md: "stretch" });
  const top = useBreakpointValue({ base: "auto", md: "0" });
  const displaySpacer = useBreakpointValue({ base: "none", md: "block" });
  const drawerSize = useBreakpointValue({ base: "full", md: "md" });
  const iconWidth = useBreakpointValue({ base: "48px", md: "73px" });
  const iconHeight = useBreakpointValue({ base: "58px", md: "73px" });

  const { isOpen: isWarningOpen, onOpen: onWarningOpen, onClose: onWarningClose } = useDisclosure();
  const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();

  const [reports, setReports] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const reportsData = await getReports(token);
        setReports(reportsData);

        const usersData = await Promise.all(
          reportsData.map(report => getUserById(report.userId))
        );

        const usersMap = usersData.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});

        setUsers(usersMap);
      } catch (error) {
        console.error('Error fetching reports or users', error);
      }
    };

    if (isWarningOpen) {
      fetchReports();
    }
  }, [isWarningOpen]);
  const getUserTypeText = (type) => {
    switch (type) {
      case 0:
        return 'Morador';
      case 1:
        return 'Força de Segurança';
      default:
        return 'Tipo desconhecido';
    }
  };

  return (
    <Flex direction={{ base: "column-reverse", md: "row" }}>
      <SidebarBox
        top={top}
        flexDirection={direction}
        alignItems={align}
        justifyContent={'space-between'}
        align={align}
      >
        <Icon ImgSrc={MapIcon} text={"Mapa"} width={iconWidth} height={iconHeight} />
        <Icon ImgSrc={WarningIcon} text={"Denuncias"} width={iconWidth} height={iconHeight} onClick={onWarningOpen} />
        <Box borderBottom="2px solid lightgray"/>
        <Spacer display={displaySpacer} />
        <Icon ImgSrc={UserIcon} text={"Você"} width={iconWidth} height={iconHeight} onClick={onProfileOpen} />
      </SidebarBox>
      {isWarningOpen && (
        <Drawer placement="left" onClose={onWarningClose} isOpen={isWarningOpen} size={drawerSize}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader boxShadow="base">
                <Center>Denuncias</Center>
              </DrawerHeader>
              <DrawerBody>
                {reports.map((report) => {
                  const user = users[report.userId];
                  return (
                    <WarningCard
                      title={report.title}
                      ImgSrc={report.imgUrl || Geleira} //Nem Aqui
                      text={report.description}
                      userImg={user?.photo || UserIcon} //Não consegui fazer as imagens serem exibidas
                      fullName={user?.fullName || 'Usuário desconhecido'}
                      type={getUserTypeText(user?.type)}
                    />
                  );
                })}
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
      {isProfileOpen && (
        <Drawer placement="left" onClose={onProfileClose} isOpen={isProfileOpen} size={drawerSize}>
          <DrawerOverlay>
            <DrawerContent>
              <Center boxShadow="base">
                <DrawerCloseButton />
                <DrawerHeader>
                  Você
                </DrawerHeader>
              </Center>
              <DrawerBody>
                <ProfileCard/>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </Flex>
  );
};

export default Sidebar;
