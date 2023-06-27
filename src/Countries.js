import React, { useState, useEffect } from "react";

const Countries = ({ query }) => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
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

  const handleCountrySelect = (country) => {
    setCountry(country);
    console.log(country.name.common);
  };

  return (
    <div>
      {countries.map((country) => (
        <button
          key={country.name.common}
          onClick={() => handleCountrySelect(country)}
        >
          {country.name.common}
        </button>
      ))}
    </div>
  );
};

export default Countries;
