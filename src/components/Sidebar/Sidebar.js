import React from 'react';
import { Box, Spacer, useBreakpointValue, Flex, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure } from '@chakra-ui/react';
import WarningCard from '../WarningCard/WarningCard';
import ProfileCard from '../ProfileCard/ProfileCard';
import WarningIcon from '../../assets/DenunciaIcon.svg'
import MapIcon from '../../assets/MapIcon.svg'
import UserIcon from '../../assets/UserIcon.svg'
import Icon from '../Icon/Icons'
import Geleira from '../../assets/Geleira.png'

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
        <Spacer display={displaySpacer} />
        <Icon ImgSrc={UserIcon} text={"Você"} width={iconWidth} height={iconHeight} onClick={onProfileOpen} />
      </SidebarBox>
      {isWarningOpen && (
        <Drawer placement="left" onClose={onWarningClose} isOpen={isWarningOpen} size={drawerSize}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Netto precisa de ajuda</DrawerHeader>
              <DrawerBody>
                <WarningCard title="Netto precisa de ajuda" ImgSrc={Geleira} text="Ola amiguinhos. Gelo Gelo Gelo Gelo Gelo, Geleira Geleira Geleira. Escalada Escalada Escalada Escalada Escalada Escalala. " />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
      {isProfileOpen && (
        <Drawer placement="left" onClose={onProfileClose} isOpen={isProfileOpen} size={drawerSize}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Profile</DrawerHeader>
              <DrawerBody>
                <ProfileCard title="User Profile" text="Here is some information about the user." image="https://institucional.ufpel.edu.br/cache/imagens/23291_API_INSTITUCIONAL_.jpg" />
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </Flex>
  );
};

export default Sidebar;
