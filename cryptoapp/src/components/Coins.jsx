import React,{useEffect,useState} from 'react';
import { Container ,RadioGroup,Radio, HStack,Button} from "@chakra-ui/react";
import axios from "axios";
import CoinCard from "./CoinCard"
import {server} from "../index";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import SearchBox from "./SearchBox";

const Coins = () => {

  const [coins,setCoins] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,seterror] = useState(false);
  const [page,setpage] = useState(1);
  const [currency,setCurrency] = useState("inr");

  const currencySymbol = 
    currency === "inr"?"₹": currency === "usd"?"$":"€"

    const changePage = (page) => {
      setpage(page);
      setLoading(true);
    }

    const btns = new Array(132).fill(1)


  useEffect(() => {
    const fetchCoins = async()=>{
      try{
      const {data} = await axios.get
      (`${server}/coins/markets?vs_currency=${currency}&page=${page}`)

      setCoins(data);
      setLoading(false);
        
      } catch(error){
        seterror(true);
        setLoading(false);
        
      }
      
    };
    fetchCoins();

  },[currency,page])

  

if(error) return (<ErrorComponent message={"Error While Fetching Coins"}/>)

  return (
    <Container maxW={"container.x1"}>
      {loading ? (
        <Loader /> 
        ):(
          <> 

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>

            </HStack>

          </RadioGroup>


          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((obj) => (
              <CoinCard 
               id={obj.id}
               key={obj.id}
               name={obj.name} 
               price={obj.current_price}
               img={obj.image} 
               symbol={obj.symbol} 
               currencySymbol={currencySymbol}
              />
              
            ))}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {
              btns.map((item,index) => (
                <Button 
                key={index}
                bgColor={"blackAlpha.900"} 
                color={"white"} 
                onClick={() => changePage(index + 1)} >
                  {index + 1}
                </Button>
              ))
            }
          </HStack>
      
          </>
        )}
    </Container> 
  )
  
};


export default Coins