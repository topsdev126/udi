import { useState } from 'react';
import { toast } from 'react-toastify';

const SearchForm = ({ onSubmit }) => {
  const [topic, setTopic] = useState('');
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!topic || !location || !distance){
      toast.success('Pls fill all inputs !');
    }else{
      const api_key = 'AqZRa0FXlQBCUTxt0faLA6w9bfzdLnT5_HvyPiRVGKJzNyKhn37rD8_jpppGJ6mU'
      const response = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?q=${location}&key=${api_key}`);
      const data = await response.json();
      const locationCoordinates = data?.resourceSets[0]?.resources[0]?.point?.coordinates;
  
      onSubmit({ topic, location, distance, locationCoordinates });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pb-1 space-y-6 grid grid-cols-12 gap-0 lg:grid-cols-12">
      <div className=' w-full col-span-12 p-4 mx-auto lg:col-span-12 xl:p-12 md:w-2/6'>
        <label className="  block">
          <span className=" mb-1 text-sm font-medium text-gray-600">Topic :</span>
          <input className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none  hover:border-red-500  border-2" type="text" id="topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </label>

        <label className="  block">
          <span className=" mb-1 text-sm font-medium text-gray-600">Location :</span>
          <input className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none  hover:border-red-500  border-2" type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>

        <label className="  block">
          <span className=" mb-1 text-sm font-medium text-gray-600">Distance in meters :</span>
          <input type="text" className="w-full px-3 py-3 rounded-lg bg-gray-50 placeholder:text-gray-400 outline-none  hover:border-red-500  border-2" id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} />
        </label>
      <button className="mt-2 bg-red-600 text-white font-bold text-md rounded p-2 disabled:bg-red-400 " type="submit">Search</button>
      </div>
    </form>

  );
};

export default SearchForm;

