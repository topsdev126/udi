import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

export default function Results() {
  const router = useRouter();
  const { topic, location, distance } = router.query;
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.API_KEY;
      const baseUrl = `https://dev.virtualearth.net/REST/v1/Locations?q=${topic} ${location}&maxResults=10&key=${apiKey}`;

      const res = await fetch(baseUrl);
      const data = await res.json();

      setResults(data.resourceSets[0].resources);
    };

    if (topic && location) {
      fetchData();
    }
  }, [topic, location]);

  return (
    <div>
      <h1>Search Results</h1>
      <p>Topic: {topic}</p>
      <p>Location: {location}</p>
      <p>Distance: {distance}</p>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}
