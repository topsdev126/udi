import { useState } from 'react';

const SearchForm = ({ onSubmit }) => {
  const [topic, setTopic] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const api_key = 'AqZRa0FXlQBCUTxt0faLA6w9bfzdLnT5_HvyPiRVGKJzNyKhn37rD8_jpppGJ6mU'
    const response = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?q=${location}&key=${api_key}`);
    const data = await response.json();
    const locationCoordinates = data.resourceSets[0].resources[0].point.coordinates;

    onSubmit({ topic, location, distance, locationCoordinates });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="topic">Topic</label>
        <input type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div>
        <label htmlFor="distance">Distance</label>
        <input type="text" id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} />
      </div>
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
