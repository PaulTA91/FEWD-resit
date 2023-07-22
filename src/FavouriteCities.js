import { useState, useEffect } from "react";
import { BsFillXCircleFill } from "react-icons/bs";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

//This is acting strangely and I can't figure out how to fix it. The add city does add a city to the array but only displays on a refresh.
// Not only that, using the remove button causes every recently added item (within that session?) to be removed instead of a single item.

const FavouriteCities = () => {
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favouriteCities")) || [],
  );

  useEffect(() => {
    localStorage.setItem("favouriteCities", JSON.stringify(favourites));
  }, [favourites]);

  const removeCity = (city) => {
    const updatedfavourites = favourites.filter(
      (favourite) => favourite !== city,
    );
    setFavourites(updatedfavourites);
  };

  if (favourites.length === 0) {
    return <div>No favourites yet</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <h2>Favourite Cities</h2>
        </CardHeader>
        <ul>
          {favourites.map((city) => (
            <li key={city}>
              {city}{" "}
              <BsFillXCircleFill
                onClick={() => removeCity(city)}
                style={{ cursor: "pointer" }}
              />
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default FavouriteCities;
