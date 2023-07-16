import { useState, useEffect } from "react";
import { BsFillXCircleFill } from "react-icons/bs";

//This is acting strangley and I can't figure out how to fix it. The add city does add a city to the array but only displays on a refresh.
// Not only that, using the remove button causes every recently added item (within that session?) to be removed instead of a single item.

const FavoriteCities = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favoriteCities")) || [],
  );

  useEffect(() => {
    localStorage.setItem("favoriteCities", JSON.stringify(favorites));
  }, [favorites]);

  const removeCity = (city) => {
    const updatedFavorites = favorites.filter((favorite) => favorite !== city);
    setFavorites(updatedFavorites);
  };

  if (favorites.length === 0) {
    return <div>No favorites yet</div>;
  }

  return (
    <div>
      <h2>Favorite Cities</h2>
      <ul>
        {favorites.map((city) => (
          <li key={city}>
            {city}{" "}
            <BsFillXCircleFill
              onClick={() => removeCity(city)}
              style={{ cursor: "pointer" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteCities;
