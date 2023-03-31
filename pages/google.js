import React, { useState } from "react";
import axios from "axios";

function Search() {
  const [topic, setTopic] = useState("");
  const [location, setLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [api_key, setApiKey] = useState("AIzaSyAY1r-SqY6FkSaLO38BCDnVW65e7EW_EBU");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${topic}&location=${location}&radius=${distance}&key=${api_key}`
    );
    const data = await response.json();
    const formattedResults = data.results.map((place) => ({
      name: place.name,
      address: place.formatted_address,
      location: place.geometry.location
    }));
    setResults(formattedResults);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Topic"
        onChange={(e) => setTopic(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <input
        type="text"
        placeholder="Distance (meters)"
        onChange={(e) => setDistance(e.target.value)}
      />
      {/* <input
        type="text"
        placeholder="API Key"
        onChange={(e) => setApiKey(e.target.value)}
      /> */}
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((place) => (
          <li key={place.name}>
            <h3>{place.name}</h3>
            <p>{place.address}</p>
            <p>Lat: {place.location.lat}, Lng: {place.location.lng}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
