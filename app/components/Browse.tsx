import React from 'react';
import Image from 'next/image'; // Using Next.js Image component

// Array of blog images with titles and sources
const destinationItems = [
  { id: 1, title: 'Dining', src: '/dining.png' },
  { id: 2, title: 'Living', src: '/livingroom.png' },
  { id: 3, title: 'Bedroom', src: '/bedroom.png' },
];

const Browse = () => {
  return (
    <div id="browse" className="container mx-auto pt-16 px-6 md:px-12 lg:px-20">
      {/* Title Section */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Browse The Range
        </h1>
        <p className="mt-4 text-base md:text-lg text-gray-700">
          Explore our collection of furniture crafted to enhance your space.
        </p>
      </div>

      {/* Browse Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinationItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
          >
            {/* Product Image */}
            <Image
              src={item.src}
              alt={item.title}
              width={500}
              height={300}
              className="object-cover w-full h-64"
            />

            {/* Card Footer (Title) */}
            <div className="p-4">
              <h4 className="text-lg font-semibold text-gray-800">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browse;
