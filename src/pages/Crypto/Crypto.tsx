import { useEffect, useState } from 'react'
import styles from './Crypto.module.scss'
import { FaDollarSign } from "react-icons/fa6";
import { PiRankingFill } from "react-icons/pi";

interface Cryptocurrency {
  id: string; // Unique identifier for the cryptocurrency
  symbol: string; // Symbol for the cryptocurrency
  name: string; // Name of the cryptocurrency
  image: string; // URL to the cryptocurrency's image
  current_price: number; // Current price of the cryptocurrency
  market_cap: number; // Market capitalization of the cryptocurrency
  market_cap_rank: number; // Rank of the cryptocurrency based on market cap
  fully_diluted_valuation: number; // Fully diluted valuation of the cryptocurrency
  total_volume: number; // Total trading volume of the cryptocurrency
  high_24h: number; // Highest price in the last 24 hours
  low_24h: number; // Lowest price in the last 24 hours
  price_change_24h: number; // Price change in the last 24 hours
  price_change_percentage_24h: number; // Price change percentage in the last 24 hours
  market_cap_change_24h: number; // Market cap change in the last 24 hours
  market_cap_change_percentage_24h: number; // Market cap change percentage in the last 24 hours
  circulating_supply: number; // Circulating supply of the cryptocurrency
  total_supply: number; // Total supply of the cryptocurrency
  max_supply: number; // Maximum supply of the cryptocurrency
  ath: number; // All-time high price
  ath_change_percentage: number; // Percentage change from all-time high
  ath_date: string; // Date of all-time high
  atl: number; // All-time low price
  atl_change_percentage: number; // Percentage change from all-time low
  atl_date: string; // Date of all-time low
  roi: { // Return on investment, can be null
    times?: number; // Multiple of investment
    currency?: string; // Currency for the return on investment
    percentage?: number; // Percentage of return on investment
  } | null;
  last_updated: string; // Timestamp of the last update
}


const Crypto = () => {
  const [crypto, setCrypto] = useState<Cryptocurrency[] | null>(null)

  
  const fetchCurrencies = async () => {
    const data = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`)
    const response = await data.json()
    // Get only the first 10 cryptocurrencies
    const firstTenCryptos = response.slice(0, 10);

    setCrypto(firstTenCryptos);
  }
  
  console.log(crypto);
  useEffect(() => {
    fetchCurrencies()
  }, [])

  if (!crypto) {
    return <main className={styles.main}><div className={styles.loading}>Loading ...</div></main>
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {
          crypto.map((coin, idx) => (
            <div key={idx} className={styles.coin}>
              <div className={styles.image}>
                <img src={`${coin.image}`} alt={coin.name} />
              </div>
              <div className={styles.info}>
                <div className={styles.symbol}>{coin.symbol}</div>
                <div className={styles.rank}><PiRankingFill /> {coin.market_cap_rank}</div>
                <div className={styles.price}><FaDollarSign /> {coin.current_price}</div>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default Crypto