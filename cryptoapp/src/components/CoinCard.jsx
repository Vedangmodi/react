import React from 'react'
import { VStack,Image, Heading, Text } from "@chakra-ui/react";
import {Link } from "react-router-dom";

const CoinCard = ({id,name,img,symbol,price,currencySymbol = "₹"}) => (
    <Link to={`/coin/${id}`} >
      
      <VStack
       w={"52"} shadow={"lg"} 
       p={"8"} borderradius={"lg"}
       transition={"all 0.2s"} m={"4"} 
  
       css={{
        "&:hover" : {
          transform:"scale(1.1)"
        }
  
       }}
      >
  
        <Image 
        src={img} 
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
        />
  
        <Heading size={"md"} noOfLine={1}> 
          {symbol} 
        </Heading>
  
        <Text noOfLines={1}>{name} </Text>
        <Text noOfLines={1}>{price ? `${currencySymbol}${price}` : "NA"} </Text>
  
      </VStack>
    
  
    </Link>
  )

export default CoinCard