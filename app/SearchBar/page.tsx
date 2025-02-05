import React from 'react'
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  return (
    <div className='flex flex-col md:flex-row items-center border p-4 rounded-lg space-y-4 md:space-y-0 md:space-x-6'>
     {/* Search Bar */}
              <div className="bg-white rounded shadow p-4 flex items-center">
                <input
                  type="text"
                  placeholder="Search your needs" // Change the text according to your need written in searchbar
                  className="w-full text-gray-600 placeholder-gray-400 outline-none"
                />
                <IoMdSearch className="text-gray-700 ml-2 text-xl cursor-pointer" />
              </div>
    </div>
  )
}

export default SearchBar