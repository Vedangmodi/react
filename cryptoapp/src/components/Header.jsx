import { Button , HStack ,Text} from "@chakra-ui/react";
import React from 'react'
import{Link} from "react-router-dom";

const Header = () => {
  return (
    <HStack p ={"5"} shadow={"base"} bgColor={"blackAlpha.900"}>

    <Button variant={"unstyled"} color={"white"}>
        <Link to="/home">Home</Link>
    </Button>

    <Button variant={"unstyled"} color={"white"}>
        <Link to="/exchanges">Exchanges</Link>
    </Button>

    <Button variant={"unstyled"} color={"white"}>
        <Link to="/coins">Coins</Link>
    </Button>

    <Text 
      position="absolute"   // Ensure text is on top of the image
      fontSize={"4xl"}
      left={"85%"}
      textAlign={"center"}
      fontWeight={"thin"}
      color={"whiteAlpha.700"}
      > CoinXchange
      
    </Text>

    </HStack>
  )
}

export default Header