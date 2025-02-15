import React, { useState } from 'react';
import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState('');

  // ✅ Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="flex justify-start w-full mt-6"> 
      {/* ✅ Align Left */}
      <div className="w-full md:w-96 bg-white rounded-lg shadow-md flex items-center p-3">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search your needs..."
          className="w-full text-gray-600 placeholder-gray-400 outline-none px-2"
        />
        <IoMdSearch className="text-gray-700 text-xl cursor-pointer" />
      </div>
    </div>
  );
};

export default SearchBar;
