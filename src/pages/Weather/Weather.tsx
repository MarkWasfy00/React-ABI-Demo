import { useEffect, useState } from 'react';
import styles from './Weather.module.scss'
import { FaSearch } from "react-icons/fa";
import { format } from 'date-fns';
import { FaWind } from "react-icons/fa6";
import { IoWaterSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";


interface Forecast {
  temperature: {
    day: number
    minimum: number
    maximum: number
    humidity: 47
  }
  time: number
}

interface Weather {
  city: string;
  condition: {
    description: string;
    icon: string;
    icon_url: string;
  }
  coordinates: {
    latitude: number
    longitude: number
  }
  country: string
  temperature: {
    current: number
    feels_like: number
    humidity: number
    pressure: number
  }
  time: number
  wind: {
    degree: number
    speed: number
  }
  daily: Forecast[]
}

// b03a640e5ef6980o4da35b006t5f2942
// 3a8a7709fct4f3c29afe0o4baad53aa5

const Weather = () => {
  const [publicKey] = useState("3a8a7709fct4f3c29afe0o4baad53aa5")
  const [country, setCountry] = useState("Alexandria")
  const [weather, setWeather] = useState<Weather[] | []>([])
  const [currentCountries, setCurrentCountries] = useState(new Set())


  const getWeather = async () => {
    const response = await fetch(`https://api.shecodes.io/weather/v1/current?query=${country}&key=${publicKey}`)
    const data = await response.json()
    return data
  }

  const getForecast = async () => {
    const response = await fetch(`https://api.shecodes.io/weather/v1/forecast?query=${country}&key=${publicKey}&units=metric`)
    const data = await response.json()
    return data
  }

  const getWeatherWithDailyForecast = async () => {
    const currentWeather = await getWeather();
    const forecast = await getForecast();
    
    // Combine current weather data with the daily forecast
    const weatherData = {
      city: currentWeather.city,
      country: currentWeather.country,
      coordinates: {
        latitude: currentWeather.coordinates.latitude,
        longitude: currentWeather.coordinates.longitude,
      },
      condition: {
        description: currentWeather.condition.description,
        icon: currentWeather.condition.icon,
        icon_url: currentWeather.condition.icon_url,
      },
      temperature: {
        current: currentWeather.temperature.current,
        feels_like: currentWeather.temperature.feels_like,
        humidity: currentWeather.temperature.humidity,
        pressure: currentWeather.temperature.pressure,
      },
      time: currentWeather.time,
      wind: {
        degree: currentWeather.wind.degree,
        speed: currentWeather.wind.speed,
      },
      daily: forecast.daily // Only the daily key is taken from the forecast
    };
  
    return weatherData;
  };

  const setFetchedWeather = async () => {
    const data = await getWeatherWithDailyForecast();
    setWeather([data]);
    const newSet = new Set();
    newSet.add(data.city);
    setCurrentCountries(newSet)
  };

  const clearFetchedWeather = async () => {
    setWeather([])
    setCurrentCountries(new Set())
  };


  const addNewFetchedWeather = async () => {
    const data: Weather = await getWeatherWithDailyForecast();
    if (!currentCountries.has(data.city)) {
      const newSet = new Set(currentCountries);
      newSet.add(data.city);
      setCurrentCountries(newSet)
      setWeather([...weather, data]);
    }
  };

  const convertTimestampToDate = (timestamp: number): string => {
    // Convert the timestamp to milliseconds
    const date = new Date(timestamp * 1000); // Multiply by 1000

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid timestamp:", timestamp);
      return "Invalid date"; // Return a fallback message or handle as needed
    }

    // Format the date to a human-readable string
    return format(date, 'PPpp'); // You can customize the format here
  };

  const formatToDay = (unixTimestamp: number): string => {
    const date = new Date(unixTimestamp * 1000);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(event.target.value); // Update state with the input's current value
  };

  useEffect(() => {
    setFetchedWeather()
  }, []); 

  

  if (weather.length < 0) {
    return <main className={styles.main}>
      <div className={styles.loading}>Loading ...</div>
    </main>
  }
  
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.title}></div>
        <div className={styles.icons}>
            <input className={styles.input} type="text" value={country} onChange={handleInputChange} />
            <div className={styles.icon} onClick={setFetchedWeather}>
              <FaSearch />
            </div>
            <div className={styles.icon} onClick={addNewFetchedWeather}>
              <FaPlus />
            </div>
            <div className={styles.icon} onClick={clearFetchedWeather}>
              <FaMinus />
            </div>
          </div>
        <div className={styles.cardscontainer}>
          {
            weather.map((countryData, idx) => (
              <div key={idx} className={styles.card}>
                <div className={styles.info}>
                  <div className={styles.city}>{countryData.city}</div>
                  <div className={styles.date}>{convertTimestampToDate(countryData.time)}</div>
                </div>
                <div className={styles.degree}>
                  <div className={styles.cel}>
                    <div className={styles.icon}></div>
                    <div className={styles.deg}>{Math.round(countryData.temperature.current)} °C</div>
                  </div>
                  <div className={styles.baseinfo}>{countryData.condition.description}</div>
                </div>
                <div className={styles.extrainfo}>
                  <div className={styles.wind}><FaWind /> {countryData.wind.speed}m/s</div>
                  <div className={styles.humidity}><IoWaterSharp /> {countryData.temperature.humidity}%</div>
                </div>
                <div className={styles.forecast}>
                  {
                    countryData.daily.map((day, idx) => (
                      <div className={styles.day} key={idx}>
                        <div className={styles.day}>{formatToDay(day.time)}</div>
                        <div className={styles.daydegree}>{Math.round(day.temperature.minimum)}°/{Math.round(day.temperature.maximum)}°</div>
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}

export default Weather