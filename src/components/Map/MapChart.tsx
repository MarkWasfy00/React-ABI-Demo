import React, { useState } from "react";
import styles from "./MapChart.module.scss"
import { SiVirustotal } from "react-icons/si";
import { FaSkullCrossbones } from "react-icons/fa6";
import { GiRadioactive } from "react-icons/gi";

import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { countryCodes } from "./CountryCodes";

interface GeographyProps {
    geometry: {
        coordinates: number[]
        type: string
    }
    id: string
    properties: {
        name: string
    }
    rsmKey: string
    svgPath: string
    type: string
}

interface CountryInfo {
    _id: number; // Unique identifier for the country
    iso2: string; // 2-letter country code
    iso3: string; // 3-letter country code
    lat: number; // Latitude of the country
    long: number; // Longitude of the country
    flag: string; // URL to the country's flag image
  }
  
  interface CovidStats {
    updated: number; // Timestamp of the last update
    country: string; // Name of the country
    countryInfo: CountryInfo; // Information about the country
    cases: number; // Total number of cases
    todayCases: number; // Number of cases today
    deaths: number; // Total number of deaths
    todayDeaths: number; // Number of deaths today
    recovered: number; // Total number of recovered cases
    todayRecovered: number; // Number of recoveries today
    active: number; // Total number of active cases
    critical: number; // Total number of critical cases
    casesPerOneMillion: number; // Cases per one million people
    deathsPerOneMillion: number; // Deaths per one million people
    tests: number; // Total number of tests conducted
    testsPerOneMillion: number; // Tests per one million people
    population: number; // Population of the country
    continent: string; // Continent of the country
    oneCasePerPeople: number; // Number of people per one case
    oneDeathPerPeople: number; // Number of people per one death
    oneTestPerPeople: number; // Number of people per one test
    activePerOneMillion: number; // Active cases per one million people
    recoveredPerOneMillion: number; // Recovered cases per one million people
    criticalPerOneMillion: number; // Critical cases per one million people
  }


const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";


const MapChart: React.FC = () => {
    const [country, setCountry] = useState<CovidStats | null>(null)
    
    const handleFetchCountry = async (geo: GeographyProps) => {
        const countryName = geo.properties.name || "Unknown"; // Get the country name from properties
        const countryInfo = countryCodes[countryName] || { alpha2: "Unknown", alpha3: "Unknown", numeric: "Unknown" };
        const data = await fetch(`https://disease.sh/v3/covid-19/countries/${countryInfo.alpha3}`)
        const response = await data.json()
        setCountry(response)
    };


    return (
    <main className={styles.main}>
        {
            country && (
                <div className={styles.info}>
                    <div className={styles.country}>{country.country}</div>
                    <div className={styles.cases}>
                        <div className={styles.activecases}><GiRadioactive className={styles.active} /> Active: {country.active}</div>
                        <div className={styles.totaldeath}><FaSkullCrossbones /> Total Death: {country.deaths}</div>
                        <div className={styles.totalcases}><SiVirustotal /> Total Cases: {country.cases}</div>
                    </div>
                </div>
            )
        }
        <ComposableMap className={styles.map}>
            <Geographies geography={geoUrl}>
            {({ geographies }) =>
                geographies.map((geo: GeographyProps) => (
                <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleFetchCountry(geo)}
                    style={{
                    default: {
                        fill: "#D6D6DA",
                        outline: "none",
                    },
                    hover: {
                        fill: "#F53",
                        outline: "none",
                    },
                    pressed: {
                        fill: "#E42",
                        outline: "none",
                    },
                    }}
                />
                ))
            }
            </Geographies>
        </ComposableMap>
    </main>
  );
};

export default MapChart;
