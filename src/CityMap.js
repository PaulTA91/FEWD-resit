import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

const CityMap = ({ city }) => {
  const position = [city.latitude, city.longitude];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position} />
    </MapContainer>
  );
};

export default CityMap;
