import React, { useState, useEffect, useRef } from "react";
import { cityLocationData } from "./CityLocationData";
import L from "leaflet";

const CityLocation = ({ city }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const searchCityLocation = () => {
      for (const countryData of cityLocationData) {
        const selectedCity = countryData.cities.find(
          (cityData) => cityData.city_name === city,
        );
        if (selectedCity) {
          setLatitude(selectedCity.lat.toString());
          setLongitude(selectedCity.lng.toString());
          return;
        }
      }
      setLatitude("");
      setLongitude("");
    };

    searchCityLocation();
  }, [city]);

  useEffect(() => {
    if (latitude && longitude) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
      const map = L.map(mapRef.current).setView([latitude, longitude], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);
      L.marker([latitude, longitude]).addTo(map);
      mapInstanceRef.current = map;
    }
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ height: "400px" }}></div>;
};

export default CityLocation;
