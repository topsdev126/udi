import SearchForm from '../components/SearchForm';
import { useState } from 'react';

export default function Search() {
  const [results, setResults] = useState([]);

  const handleSearch = async (searchParams) => {
    const { topic, location, distance } = searchParams;

    const api_key = 'AqZRa0FXlQBCUTxt0faLA6w9bfzdLnT5_HvyPiRVGKJzNyKhn37rD8_jpppGJ6mU'
    const response = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?q=${topic},${location}&key=${api_key}`);
    const data = await response.json();
    const locations = data?.resourceSets[0]?.resources;

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
      address: result?.address?.formattedAddress,
      location: result?.point?.coordinates?.reverse().join(', ')
    }));

    setResults(formattedResults);
  };

  return (
    <>
      <main className=" space-y-6">
        <SearchForm onSubmit={handleSearch} />
        {results.length === 0 ? (
          <div className="flex  gap-6 w-full  ">
            <div className="mx-auto  rounded-lg ">
              <h1 className="mx-3 text-lg font-semibold ">Not found result</h1>

            </div>
          </div>
        ) : (

          <section className="flex gap-6 w-full  ">
            {results.map((result, index) => (<div key={index} className=" mx-auto overflow-hidden bg-white rounded-lg shadow-lg ">


              <div className="flex items-center px-6 py-3 bg-red-500">
                <h1 className="mx-3 text-lg font-semibold text-white">Go to Map </h1>

              </div>


              <div className="px-6 py-4" >

                <h1 className="text-xl font-semibold text-gray-800 dark:text-white"> Name: </h1>
                <p className="py-2 text-gray-700 mt-2">{result.name}</p>
                <br />

                <h1 className="text-xl font-semibold text-gray-800 dark:text-white"> Address: </h1>
                <p className="py-2 text-gray-700 mt-2">{result.address}</p>
                <br />

                <h1 className="text-xl font-semibold text-gray-800 dark:text-white"> Location: </h1>
                <p className="py-2 text-gray-700 mt-2">{result.location}</p>
                <br />


              </div>

            </div>
            ))}
          </section>




        )}
      </main>
    </>
  );
}
