import React from "react";

const FavoriteCities = () => {
  const favorites = JSON.parse(localStorage.getItem("favoriteCities")) || [];

  if (favorites.length === 0) {
    return <div>No favorites yet</div>;
  }

  return (
    <div>
      <h2>Favorite Cities</h2>
      <ul>
        {favorites.map((city) => (
          <li key={city}>{city}</li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteCities;
