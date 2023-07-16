import React, { useState, useEffect } from "react";
import Star from "./Star";
import { createArray } from "./lib";

export default function StarRating({ totalStars = 5, city, country }) {
  const [selectedStars, setSelectedStars] = useState(0);
  const storageKey = `${city}-${country}-rating`;

  useEffect(() => {
    const savedRating = localStorage.getItem(storageKey);
    if (savedRating) {
      setSelectedStars(parseInt(savedRating));
    }
  }, [storageKey]);

  const handleStarSelect = (starIndex) => {
    setSelectedStars(starIndex + 1);
    localStorage.setItem(storageKey, starIndex + 1);
    console.log(city, country);
  };

  return (
    <div>
      <h4>
        Your Rating:{" "}
        {createArray(totalStars).map((n, i) => (
          <Star
            key={i}
            selected={i < selectedStars}
            onSelect={() => handleStarSelect(i)}
          />
        ))}
      </h4>
    </div>
  );
}
