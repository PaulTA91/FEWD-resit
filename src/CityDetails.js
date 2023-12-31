import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import StarRating from "./Stars";
import CardHeader from "react-bootstrap/esm/CardHeader";

Chart.register(...registerables);

const CityDetails = ({ city, country }) => {
  const [chartData, setChartData] = useState({
    labels: [
      "1kg Apples",
      "1kg Bananas",
      "1kg Chicken Breast",
      "12 Eggs",
      "Loaf of Bread",
      "1ltr Milk",
      "1kg White Rice",
    ],
    datasets: [
      {
        label: "Price in Local Currency",
        data: [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: [
          "#ffbb11",
          "#ec02f1",
          "#50AF95",
          "#03ba6f",
          "#2a71d0",
          "#DDDD345",
          "#FFFFFF",
        ],
      },
    ],
  });

  const [cityRating, setCityRating] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://cost-of-living-and-prices.p.rapidapi.com/prices?city_name=${encodeURIComponent(
        city,
      )}&country_name=${encodeURIComponent(country)}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "fbbdc20ea5msh670f2fa05ebb446p1f121ajsnaf58092f3b27",
          "X-RapidAPI-Host": "cost-of-living-and-prices.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        let filteredData = [
          result.prices[7].avg,
          result.prices[8].avg,
          result.prices[40].avg,
          result.prices[13].avg,
          result.prices[15].avg,
          result.prices[17].avg,
          result.prices[22].avg,
        ];
        let filteredLabels = [
          "1kg Apples",
          "1kg Bananas",
          "1ltr Gasoline",
          "12 Eggs",
          "Loaf of Bread",
          "1ltr Milk",
          "1kg White Rice",
        ];
        setChartData({
          labels: filteredLabels,
          datasets: [
            {
              label: "Prices in local currency",
              data: filteredData,
              backgroundColor: [
                "#ffbb11",
                "#ec02f1",
                "#50AF95",
                "#03ba6f",
                "#2a71d0",
                "#dddd34",
                "#FF0074",
              ],
            },
          ],
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [city, country]);

  useEffect(() => {
    const storedRating = localStorage.getItem(`${city}-${country}-rating`);
    if (storedRating) {
      setCityRating(Number(storedRating));
      console.log(cityRating);
    }
  }, [city, country]);

  const handleSaveRating = (rating) => {
    localStorage.setItem(`${city}-${country}-rating`, rating);
    setCityRating(rating);
  };

  const handleAddToFavourites = () => {
    const key = `${city}, ${country}`;
    let favourites = JSON.parse(localStorage.getItem("favouriteCities")) || [];
    if (!favourites.includes(key)) {
      favourites.push(key);
      localStorage.setItem("favouriteCities", JSON.stringify(favourites));
    }
  };

  const favourites = JSON.parse(localStorage.getItem("favouriteCities")) || [];
  const isfavourite = favourites.includes(`${city}, ${country}`);

  return (
    <div>
      <Card>
        <CardHeader>
          <h2>The average prices for basic groceries in the local currency:</h2>
        </CardHeader>
        {isfavourite ? (
          <p>This city is in your favourites list.</p>
        ) : (
          <button className="favouriteButton" onClick={handleAddToFavourites}>
            Add to favourites
          </button>
        )}
        <StarRating
          totalStars={5}
          city={city}
          country={country}
          onSaveRating={handleSaveRating}
        />
        <Bar
          data={chartData}
          options={{
            plugins: {
              display: true,
              text: "Cost of Living",
              color: "#000000",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          }}
        />
      </Card>
    </div>
  );
};

export default CityDetails;
