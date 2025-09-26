import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function HeroSection({ value , onValueChange, onClick}) {
  

  return (
    <section className="w-full h-[40vh] mt-15">
      <div className="relative w-full h-full">
        <img
          src="/assets/images/conference-audience.jpg"
          alt="Example"
          className="w-full h-full object-cover brightness-50 pb-5 md:pb-6 xl:pb-7"
        />
        <h2
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-full text-center px-4 text-xl
        sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:5xl"
        >
          Discover Events That Inspire You
        </h2>
        <div
          className="absolute shadow-md bottom-0 left-1/2 -translate-x-1/2 rounded-full
         border-gray-300 border w-3/4 h-fit overflow-hidden xl:w-1/2 md:w-5/8 sm:w-9/16"
        >
          <div className="flex justify-end pe-2 items-center space-x-0 shadow-xl w-full overflow-hidden bg-white">
            <input
              value={value.search}
                          onChange={onValueChange}
                          name="search"
              type="text"
              placeholder="Browse conferences..."
              className="ps-4 xl:ps-6 py-2 md:py-3 xl:py-4 focus:outline-none text-sm sm:text-base w-full h-full z-0"
            />
            <button onClick={onClick}>
              <IoSearchOutline className="text-xl sm:text-2xl xl:text-3xl h-full text-gray-400 p-0.5 m-0.5 " />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
