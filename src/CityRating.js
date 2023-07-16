import React, { useState } from "react";

const CityRating = ({ onSave }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (event) => {
    const value = parseInt(event.target.value);
    setRating(value);
  };

  const handleSaveRating = () => {
    onSave(rating);
  };

  return (
    <div>
      <h3>Rate the City:</h3>
      <div>
        <input
          type="range"
          min="0"
          max="5"
          value={rating}
          onChange={handleRatingChange}
        />
        <span>{rating} stars</span>
      </div>
      <button onClick={handleSaveRating}>Save Rating</button>
    </div>
  );
};

export default CityRating;
