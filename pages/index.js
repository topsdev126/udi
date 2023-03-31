import SearchForm from '../components/SearchForm';
import { useState, useEffect } from 'react';
import BingMap from "@/components/BingMap";
export default function Search() {
  const [results, setResults] = useState([]);

  const [latitude, setLatitude] = useState(36.072063);
  const [longitude, setLlongitude] = useState(-119.007736);

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

  const show_location = async (locations)=>{
    let location = locations.split(',');
    setLatitude(parseFloat(location[1]));
    setLlongitude(parseFloat(location[0]));
    console.log(location)
  }


  return (
    <>
      <main className=" space-y-6">
        <SearchForm onSubmit={handleSearch} />
        {results.length === 0 ? (
          <div className="flex  gap-6 w-full  ">
            <div className="mx-auto  rounded-lg ">
              <h1 className="mx-3 text-lg font-semibold ">Not found </h1>

            </div>
          </div>
        ) : (

          <section className="flex gap-6 w-full  ">
            {results.map((result, index) => (<div key={index} className=" mx-auto overflow-hidden bg-white rounded-lg shadow-lg ">


              <div onClick={()=>{show_location(result.location)}} className="flex items-center px-6 py-3 ">
              <button className="inline-flex px-5 py-3 text-red-500 hover:text-red-600 focus:text-red-600 hover:bg-red-100 focus:bg-red-100 border border-red-500 rounded-md mb-3">
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
             show in map
            </button>

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
        < br/>
        <BingMap latitude={latitude} longitude={longitude} />
      </main>
    </>
  );
}
