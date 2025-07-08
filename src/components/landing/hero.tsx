import React from "react";

const Hero = () => {
  return (
    <section className="pt-24 pb-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Save Lives Through
          <span className="text-red-600 block">Blood Donation</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Connect donors with those in need. Every donation can save up to three
          lives.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Donate Blood Now
          </button>
          <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
            Find Blood
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
