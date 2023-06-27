import React from "react";

const CityInfo = ({ city }) => {
  return (
    <div>
      <h2>{city.name}</h2>
      <p>Capital: {city.capital}</p>
      {/* Add more information from the country-facts API */}
    </div>
  );
};

export default CityInfo;
