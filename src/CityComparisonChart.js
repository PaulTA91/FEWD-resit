import React from "react";
import { Bar } from "react-chartjs-2";

const CityComparisonChart = ({ cities }) => {
  const chartData = {
    labels: cities.map((city) => city.name),
    datasets: [
      {
        label: "Cost of Living",
        data: cities.map((city) => city.costOfLiving),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      // Add more datasets for other factors you want to compare
    ],
  };

  return <Bar data={chartData} />;
};

export default CityComparisonChart;
