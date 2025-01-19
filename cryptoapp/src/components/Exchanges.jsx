import React,{useEffect,useState} from 'react';
import { Container , HStack,VStack,Image, Heading, Text } from "@chakra-ui/react";
import axios from "axios";
//  Axios is a popular JavaScript library
//  used for making HTTP requests to APIs
// Axios is a promise-based HTTP client for making 
// requests such as GET, POST, PUT, DELETE, etc.
import {server} from "../index";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {

  const [exchanges,setExchanges] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,seterror] = useState(false);

  useEffect(() => {
    const fetchExchanges = async()=>{
      try{
      const {data} = await axios.get(`${server}/exchanges`)
      setExchanges(data);
      setLoading(false);
        
      } catch(error){
        seterror(true);
        setLoading(false);
        
      }
      
    };
    fetchExchanges();

  },[])

if(error) return (<ErrorComponent message={"Error While Fetching Exchanges"}/>)

  return (
    <Container maxW={"container.x1"}>
      {loading ? (
        <Loader /> 
        ):(
          <> 
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((obj) => (
              <ExchangeCard 
               key={obj.id}
               name={obj.name} 
               img={obj.image} 
               rank={obj.trust_score_rank} 
               url={obj.url}
              />
              
            ))}
          </HStack>
      
          </>
        )}
    </Container> 
  )
  
};

const ExchangeCard = ({name,img,rank,url}) => (
  <a href={url} target={"blank"} >
    
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
        {rank} 
      </Heading>

      <Text noOfLines={1}>{name} </Text>

    </VStack>
  

  </a>
)

export default Exchanges

