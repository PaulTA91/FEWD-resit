import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

import { cityLocationData } from "./CityLocationData";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

const CityLocation = ({ city }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const mapRef = useRef(null);

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

  // Recenter the map whenever the latitude and longitude change
  useEffect(() => {
    if (latitude && longitude && mapRef.current) {
      const map = mapRef.current;
      map.panTo([latitude, longitude]);
    }
  }, [latitude, longitude]);

  return (
    <div>
      <Card>
        <CardHeader>
          <h2>This city on the map:</h2>
        </CardHeader>
        {latitude && longitude ? (
          <MapContainer
            ref={mapRef} // Set the mapRef
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
