require("isomorphic-fetch");
const fs = require("fs");

const fetchData = async () => {
  const url = "https://cost-of-living-and-prices.p.rapidapi.com/cities";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "fbbdc20ea5msh670f2fa05ebb446p1f121ajsnaf58092f3b27",
      "X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.text();
    console.log(result);

    // Store the result in CityLocationData.js
    fs.writeFile("CityLocationData.js", result, (err) => {
      if (err) throw err;
      console.log("CityLocationData.js file has been created successfully!");
    });
  } catch (error) {
    console.error(error);
  }
};

fetchData();
