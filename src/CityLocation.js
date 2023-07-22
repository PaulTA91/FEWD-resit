import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import { cityLocationData } from "./CityLocationData";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

const CityLocation = ({ city }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const searchCityLocation = () => {
      for (const countryData of cityLocationData) {
        const selectedCity = countryData.cities.find(
          (cityData) => cityData.city_name === city,
        );
        if (selectedCity) {
          setLatitude(selectedCity.lat);
          setLongitude(selectedCity.lng);
          return;
        }
      }
      setLatitude(null);
      setLongitude(null);
    };

    searchCityLocation();
  }, [city]);

  return (
    <div>
      <Card>
        <CardHeader>
          <h2>This city on the map:</h2>
        </CardHeader>
        {latitude && longitude ? (
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{ height: "400px" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[latitude, longitude]}
              icon={
                new Icon({
                  iconUrl: markerIconPng,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            ></Marker>
          </MapContainer>
        ) : (
          <p>No data available for this city.</p>
        )}
      </Card>
    </div>
  );
};

export default CityLocation;
