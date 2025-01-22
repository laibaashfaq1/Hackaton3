import React from "react";
import Image from "next/image";

const Rooms = () => {
  return (
    <section className="bg-[#f8f5f0] py-16">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Text Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            50+ Beautiful rooms inspiration
          </h2>
          <p className="text-gray-600 mt-4">
            Our designer already made a lot of beautiful prototypes of rooms
            that inspire you.
          </p>
          <button className="mt-6 px-4 md:px-6 py-2 text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg shadow-lg">
            Explore More
          </button>
        </div>

        {/* Right Image Section */}
        <div className="w-full md:w-1/2 flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          {/* Image 1 */}
          <div className="relative flex-1">
            <Image
              src="/inner.png" // Replace with your actual image path
              alt="Bedroom"
              width={500}
              height={300}
              className="rounded-lg"
            />
          </div>

          {/* Image 2 and Indicator */}
          <div className="relative flex-1 flex flex-col items-center">
            <Image
              src="/din.png" // Replace with your actual image path
              alt="Living Room"
              width={500}
              height={300}
              className="rounded-lg"
            />
            <div className="mt-4">
              <Image
                src="/Indicator.png" // Replace with your actual image path
                alt="Indicator"
                width={60}
                height={20} // Adjust size as needed
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
