import React from 'react';
import { Box, Spacer, useBreakpointValue } from '@chakra-ui/react';
import WarningIcon from '../../assets/DenunciaIcon.svg'
import MapIcon from '../../assets/MapIcon.svg'
import UserIcon from '../../assets/UserIcon.svg'
import Icon from '../Icon/Icons'

const Sidebar = () => {
  const direction = useBreakpointValue({ base: "row", md: "column" });
  const align = useBreakpointValue({ base: "center", md: "stretch" });
  const top = useBreakpointValue({ base: "auto", md:"0"});
  const displaySpacer = useBreakpointValue({ base: "none", md: "block" });
  const iconWidth = useBreakpointValue({ base: "48px", md: "73px" });
  const iconHeight = useBreakpointValue({ base: "58px", md: "73px" });

  return (
    <Box
      position="fixed"
      left={0}
      top={top}
      bottom={0}
      height={{ base: "10%", md: "100%" }}
      width={{ base: "100%", md: "9%" }}
      display="flex"
      flexDirection={direction}
      alignItems={align}
      justifyContent={'space-between'}
      padding={4}
      boxSizing="border-box"
      zIndex={1}
      backgroundColor="white"
      align={align}
      
    >
        <Icon ImgSrc={MapIcon} text={"Mapa"} width={iconWidth} height={iconHeight}/> 
        <Icon ImgSrc={WarningIcon} text={"Denuncias"} width={iconWidth} height={iconHeight}/> 
      <Spacer display={displaySpacer}/>
        <Icon ImgSrc={UserIcon} text={"Você"} width={iconWidth} height={iconHeight}/> 

    </Box>
  );
};

export default Sidebar;
