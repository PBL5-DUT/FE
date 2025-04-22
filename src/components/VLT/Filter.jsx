import React from 'react';

const Filter = () => {
  return (
    <div className="filter-container flex flex-wrap gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <button className="filter-button bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
        Liked
      </button>     
      <button className="filter-button bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
        Number of volunteers
      </button>
      <button className="filter-button bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
        Recently
      </button>
    </div>
  );
};

export default Filter;