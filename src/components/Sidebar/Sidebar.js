import React, { useState } from 'react';
import { Box, Spacer, useBreakpointValue, Flex } from '@chakra-ui/react';
import WarningCard from '../WarningCard/WarningCard';
import WarningIcon from '../../assets/DenunciaIcon.svg'
import MapIcon from '../../assets/MapIcon.svg'
import UserIcon from '../../assets/UserIcon.svg'
import Icon from '../Icon/Icons'
import Geleira from '../../assets/Geleira.png'

const SidebarBox = ({children, ...props}) => (
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
  const [showWarningCard, setShowWarningCard] = useState(false);
  const direction = useBreakpointValue({ base: "row", md: "column" });
  const align = useBreakpointValue({ base: "center", md: "stretch" });
  const top = useBreakpointValue({ base: "auto", md: "0" });
  const displaySpacer = useBreakpointValue({ base: "none", md: "block" });
  const iconWidth = useBreakpointValue({ base: "48px", md: "73px" });
  const iconHeight = useBreakpointValue({ base: "58px", md: "73px" });

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
        <Icon ImgSrc={WarningIcon} text={"Denuncias"} width={iconWidth} height={iconHeight} onClick={() => setShowWarningCard(!showWarningCard)} />
        <Spacer display={displaySpacer} />
        <Icon ImgSrc={UserIcon} text={"Você"} width={iconWidth} height={iconHeight} />
      </SidebarBox>
      {showWarningCard &&
        <SidebarBox position="fixed" left={{ base: "0", md: "8%" }} bottom={{ base: "0", md: "0" }} width={{ base: "100%", md: "35%" }} height={{ base: "100%", md: "auto" }} zIndex={1}>
          <WarningCard title="Netto precisa de ajuda" ImgSrc={Geleira} text="Ola amiguinhos. Gelo Gelo Gelo Gelo Gelo, Geleira Geleira Geleira. Escalada Escalada Escalada Escalada Escalada Escalala. " />
        </SidebarBox>
      }
    </Flex>
  );
};

export default Sidebar;
