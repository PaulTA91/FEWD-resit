import React, { useEffect, useState } from "react";
import CityInfo from "./CityInfo";
import CityMap from "./CityMap";
import CostOfLiving from "./CostOfLiving";
import CityComparisonChart from "./CityComparisonChart";
import Countries from "./Countries";

const App = () => {
  return (
    <div>
      <h1>City Comparison App</h1>
      <Countries />
    </div>
  );
};

export default App;
