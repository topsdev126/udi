import SearchForm from '../components/SearchForm';
import { useState } from 'react';

export default function Search() {
  const [results, setResults] = useState([]);

  const handleSearch = async (searchParams) => {
    const { topic, location, distance } = searchParams;

    const api_key = 'AqZRa0FXlQBCUTxt0faLA6w9bfzdLnT5_HvyPiRVGKJzNyKhn37rD8_jpppGJ6mU'
    const response = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?q=${topic},${location}&key=${api_key}`);
    const data = await response.json();
    const locations = data.resourceSets[0].resources;

    // Filter locations by distance
    const filteredLocations = locations.filter((location) => {
      const distanceToLocation = location?.point?.coordinates.reduce((prev, curr, i) => {
        const diff = curr - searchParams?.locationCoordinates[i];
        return prev + diff * diff;
      }, 0) ** 0.5;

      return distanceToLocation <= distance;
    });

    const formattedResults = filteredLocations.map((result) => ({
        name: result.name,
        address: result.address.formattedAddress,
        location: result.point.coordinates.reverse().join(', ')
      }));
  
      setResults(formattedResults);
  };

  return (
    <div>
      <h1>Search</h1>
      <SearchForm onSubmit={handleSearch} />
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <h2>{result.name}</h2>
              <p>{result.address}</p>
              <p>Location: {result.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
