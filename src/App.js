import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "./styles.css";

import Countries from "./Countries";

const App = () => {
  return (
    <div>
      <div className="siteHeader">
        <h1 className="bannerText">City Comparison App</h1>
      </div>
      <Countries />
    </div>
  );
};

export default App;
