import React, { useState, useEffect } from "react";

const Countries = ({ query }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://country-facts.p.rapidapi.com/region/europe";
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
    console.log(selectedCountryName);
  };

  return (
    <div>
      <label>Select a country:</label>
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
      <p>
        <h2>{selectedCountry ? selectedCountry.name.common : ""}</h2>
      </p>
    </div>
  );
};

export default Countries;
