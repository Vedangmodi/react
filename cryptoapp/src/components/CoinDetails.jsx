import {Container,Box,RadioGroup,Radio,HStack,VStack,Text} from "@chakra-ui/react";
import {Image,Stat,StatLabel,StatNumber,StatHelpText,StatArrow,Badge } from "@chakra-ui/react";
// import * as Chakra from "@chakra-ui/react";
import{Progress,Button} from "@chakra-ui/react";
import axios from "axios";
import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
import Loader from './Loader'
import {server} from "../index"
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";
 

const CoinDetails = () => {

    const [coin,setCoin] = useState({});
    const [loading,setLoading] = useState(true);
    const [error,seterror] = useState(false);
    // const [page,setpage] = useState(1);
    const [currency,setCurrency] = useState("inr");
    const [days,setDays] = useState("24h");
    const [chartArray,setChartArray] = useState([]);

    const params = useParams();

    const btns=["24","7d","14d","30d","60d","200d","1y","max"];

    const switchChartStats = (key) =>{
      switch(key){

        case "7d":
          setDays("7d");
          setLoading(true);
          break;

        case "14d":
          setDays("14d");
          setLoading(true);
          break;
            
        case "30d":
          setDays("30d");
          setLoading(true);
          break;
          
        case "60d":
          setDays("60d");
          setLoading(true);
          break;  

          case "200d":
            setDays("200d");
            setLoading(true);
            break;
            
          case "1y":
            setDays("1y");
            setLoading(true);
            break;  

            case "max":
              setDays("max");
              setLoading(true);
              break;  

        default:
          setDays("24h");
          setLoading(true);
          break; 

      }

    } 

    const currencySymbol = 
    currency === "inr"?"₹": currency === "usd"?"$":"€";


    useEffect(() => {
      const fetchCoin = async()=>{
        try{
        const {data} = await axios.get
        (`${server}/coins/${params.id}`);

        const {data: chartData} = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        
        setCoin(data);
        setChartArray(chartData.prices)
        setLoading(false);
          
        } catch(error){
          seterror(true);
          setLoading(false);
          
        }
        
      };
      fetchCoin();
  
    },[params.id,currency,days])

    if(error) return (<ErrorComponent message={"Error While Fetching Coin"}/>)


  return (
    <Container maxW={"container.xl"}>
      {
        loading?<Loader/>:(
          <>
          <Box width={"full"} borderWidth={1}>
            <Chart arr ={chartArray} currency={currencySymbol} days={days}/>
          </Box>

          <HStack p="4" /*flexWrap={"wrap"}*/ overflowX={"auto"}>
          {
            btns.map((i) => (
              <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>

            ))
          }

          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR</Radio>
              <Radio value={"usd"}>USD</Radio>
              <Radio value={"eur"}>EUR</Radio>         
            </HStack>
          
          </RadioGroup>

          <VStack spacing={"4"} p="16" alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf="center" opacity={0.7}>
              Last Updated On {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image 
            src={coin.image.large}
            w={"16"}
            h={"16"}
            objectFit={"contain"}
            />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]} </StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"}/>
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
              {`#${coin.market_cap_rank}`}
            </Badge>

            <CustomBar 
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w={"full"} p="4">
              <Item
               title={"Max Supply"} 
               value={coin.market_data.max_supply} />

              <Item 
              title={"Circulating Supply"} 
              value={coin.market_data.circulating_supply} />

              <Item 
              title={"Market cap"} 
              value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>

              <Item
              title={"All Time Low"} 
              value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>

              <Item
              title={"All Time High"} 
              value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>


            </Box>

          </VStack>
          </>
        )
      }

    </Container>
  )
}

const Item=({title,value}) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>
    
  </HStack>
)

const CustomBar = ({high,low}) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}> 24Hr Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>

  </VStack>
)

export default CoinDetails