import React, { useState, useEffect } from "react";

const CityDetails = ({ city, country }) => {
  const [cityDetails, setCityDetails] = useState([]);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=" +
        city +
        "&country_name=" +
        country;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "fbbdc20ea5msh670f2fa05ebb446p1f121ajsnaf58092f3b27",
          "X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setCityDetails(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return <div>{/* Render city details using the cityDetails state */}</div>;
};

export default CityDetails;
