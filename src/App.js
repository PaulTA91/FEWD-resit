import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

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
