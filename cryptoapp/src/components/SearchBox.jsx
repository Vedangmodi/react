import { Input, HStack } from "@chakra-ui/react";
import React, { useState } from 'react';
import CoinCard from './CoinCard'

const SearchBox = ({ coins, currencySymbol }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter the coins based on the search term
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Input
        placeholder="Search for a coin..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb={4}
      />

      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
        {filteredCoins.map((obj) => ( // Corrected to filteredCoins
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
    </>
  );
};

export default SearchBox;
