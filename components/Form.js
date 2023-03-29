import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';


export default function Form() {
  const [topic, setTopic] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // const apiKey = process.env.API_KEY;
    // const baseUrl = `https://dev.virtualearth.net/REST/v1/Locations?q=${topic} ${location}&maxResults=10&key=${apiKey}`;
  
    // const res = await fetch(baseUrl);
    // const data = await res.json();
  
    // console.log(data);
    router.push({
        pathname: '/results',
        query: { topic, location, distance },
      });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Topic:
        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
      </label>
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label>
        Distance:
        <input type="text" value={distance} onChange={(e) => setDistance(e.target.value)} />
      </label>
      <button type="submit">Search</button>
    </form>
  );
}
