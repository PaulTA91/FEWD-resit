import React, { useState, useEffect } from "react";

import CityDetails from "./CityDetails";

const Countries = ({ query }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [capitalCity, setCapitalCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://country-facts.p.rapidapi.com/all";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "fbbdc20ea5msh670f2fa05ebb446p1f121ajsnaf58092f3b27",
          "X-RapidAPI-Host": "country-facts.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setCountries(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [query]);

  const handleCountrySelect = (event) => {
    const selectedCountryName = event.target.value;
    const selectedCountry = countries.find(
      (country) => country.name.common === selectedCountryName,
    );
    setSelectedCountry(selectedCountry);
    setCapitalCity(selectedCountry ? selectedCountry.capital : "");
    console.log(selectedCountryName);
    console.log(capitalCity);
  };

  return (
    <div>
      <label>Select a country: </label>
      <select
        value={selectedCountry ? selectedCountry.name.common : ""}
        onChange={handleCountrySelect}
      >
        <option value="">Select</option>
        {countries.map((country) => (
          <option key={country.name.common} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <h3>
            {selectedCountry.name.common +
              " is located in " +
              selectedCountry.subregion}
          </h3>
          <h3>
            The capital city of {selectedCountry.name.common} is {capitalCity}
          </h3>
        </div>
      )}
      <CityDetails city={capitalCity} country={selectedCountry} />
    </div>
  );
};

export default Countries;
