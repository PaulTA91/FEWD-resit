import React, { useState, useEffect } from "react";
import { cityLocationData } from "./CityLocationData";

const CityLocation = ({ city }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    console.log("City Location Data:", cityLocationData);
    console.log("City:", city);

    const searchCityLocation = () => {
      for (const countryData of cityLocationData) {
        const selectedCity = countryData.cities.find(
          (cityData) => cityData.city_name === city,
        );
        if (selectedCity) {
          console.log("Match found:", selectedCity);
          setLatitude(selectedCity.lat.toString());
          setLongitude(selectedCity.lng.toString());
          return; // Exit the loop if a match is found
        }
      }

      console.log("No match found");
      setLatitude("");
      setLongitude("");
    };

    searchCityLocation();
  }, [city]);

  useEffect(() => {
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
  }, [latitude, longitude]);

  return <div>City Location Component</div>;
};

export default CityLocation;
