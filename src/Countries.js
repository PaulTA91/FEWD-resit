import React, { useState, useEffect } from "react";
import CityDetails from "./CityDetails";
import CityLocation from "./CityLocation";
import FavoriteCities from "./FavouriteCities";
import { Accordion, Card } from "react-bootstrap";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import CardHeader from "react-bootstrap/esm/CardHeader";

const Countries = ({ query }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [capitalCity, setCapitalCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://country-facts.p.rapidapi.com/all";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "551ee52c0amshc731cf049aad965p1fce89jsnf9cdd8f82e66",
          "X-RapidAPI-Host": "country-facts.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setCountries(result);
        setFilteredCountries(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [query]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCapitalCity(country ? country.capital[0] : ""); // Update capitalCity to use the first element of the capital array
    setSearchQuery("");
  };

  const handleSearchQueryChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredCountries(filtered);
    setSelectedCountry(null);
    setCapitalCity("");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Accordion>
            <AccordionHeader>
              <label>Search for a country:</label>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
            </AccordionHeader>
            <AccordionBody>
              <div className="country-list-container">
                {filteredCountries.length === 0 ? (
                  <p>No results found.</p>
                ) : (
                  <ul className="country-list">
                    {filteredCountries.map((country) => (
                      <li
                        key={country.name.common}
                        onClick={() => handleCountrySelect(country)}
                        style={{ cursor: "pointer" }}
                      >
                        {country.name.common}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </AccordionBody>
          </Accordion>
        </div>

        {selectedCountry && (
          <div>
            <div className="row">
              <div className="col-md-6">
                <Card>
                  <CardHeader>
                    <h2 className="countryName">
                      {selectedCountry.name.common}
                    </h2>
                  </CardHeader>
                  <h3>
                    {selectedCountry.name.common +
                      " is located in " +
                      selectedCountry.subregion}
                  </h3>
                  <h3>
                    The capital city of {selectedCountry.name.common} is{" "}
                    {capitalCity}
                  </h3>
                </Card>
              </div>
              <p></p>
              <div className="col-md-6 col-12">
                <CityDetails
                  city={capitalCity}
                  country={selectedCountry.name.common}
                />
              </div>
              <p></p>
              <div className="col-md-6 col-12">
                <CityLocation city={capitalCity} />
              </div>
              <p></p>
              <div className="col-md-6 col-12">
                <FavoriteCities />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Countries;
