import React, { useState, useEffect } from "react";
import CityDetails from "./CityDetails";
import CityLocation from "./CityLocation";

const Countries = ({ query }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [capitalCity, setCapitalCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

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
        setFilteredCountries(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [query]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCapitalCity(country ? country.capital : "");
    setSearchQuery("");
  };

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredCountries(filtered);
    setSelectedCountry(null);
    setCapitalCity("");
  };

  return (
    <div>
      <label>Search for a country: </label>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
      {filteredCountries.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li
              key={country.name.common}
              onClick={() => handleCountrySelect(country)}
              style={{ cursor: "pointer" }}
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      )}
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
          <CityDetails
            city={capitalCity}
            country={selectedCountry.name.common}
          />
          <CityLocation city={capitalCity[0]} />
        </div>
      )}
    </div>
  );
};

export default Countries;
