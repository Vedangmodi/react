import React from 'react'
import {Box,Image,Text} from "@chakra-ui/react";
import imgSrc from "../assets/img.webp"


const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"100vh"}> 
     <Image 
        w={"100%"} 
        h={"100%"} 
        objectFit={"cover"}
        src={imgSrc} 
        filter={"grayscale(1)"}
         
      />
    
    </Box>

  )
}

export default Home;