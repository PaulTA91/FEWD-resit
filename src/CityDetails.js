import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// use this component to get the price data from the API then use the following items to make the chart:
// Pair of Jeans: Item 4 - not using
// Pair of running Shoes: Item 6 - not using
// 1KG Apples: Item 7
// 1KG Bananas: Item 8
// 1KG Chicken Breast: Item 11 - not using, swapped for Gasoline
// 12 eggs: Item 13
// Loaf of Bread: Item 15
// 1ltr Milk: Item 17
// 1KG White Rice: Item 22
// 1Ltr Gasoline: Item 40

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
          "#55dft5",
        ],
      },
    ],
  });

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
                "#55dft5",
              ],
            },
          ],
        });
        console.log(chartData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [city, country]);

  return (
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
  );
};

export default CityDetails;
