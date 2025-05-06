import React from "react";

function About() {
  return (
    <div className="bg-gray-50 p-8">


      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 leading-tight">
          About Our Auto Spare Parts
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          At Auto SpareX, we provide top-quality spare parts for both two-wheelers and four-wheelers, ensuring your vehicle stays in perfect shape throughout its lifetime. We specialize in a broad range of products designed to boost your vehicle's performance, durability, and safety.
        </p>
      </header>

      <section className="relative w-full h-[500px] mb-16 rounded-lg overflow-hidden">
        <img
          src="/images/slide1.jpg" 
          alt="Spare Parts"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <h2 className="text-3xl font-semibold">Quality Parts for Every Vehicle</h2>
          <p className="mt-2 text-lg max-w-xl text-center">
            From essential components to performance upgrades, we have everything you need to keep your two-wheeler or four-wheeler running smoothly.
          </p>
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Our mission is to provide the highest quality spare parts for all types of vehicles, from motorcycles and scooters to cars and trucks. We aim to ensure compatibility, reliability, and top-notch performance for every product.
        </p>
      </section>

      <section className="flex flex-col lg:flex-row items-center gap-16 mb-16">
        <div className="w-full lg:w-1/2">
          <img
            src="/images/slide3.jpg" 
            alt="Two-Wheeler Parts"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Two-Wheeler Parts</h3>
          <p className="text-lg text-gray-600">
            Whether you're riding a motorcycle or a scooter, we offer an extensive range of spare parts to keep your bike in top condition. From engine components to brake systems, we ensure durability and reliability for every ride.
          </p>
        </div>
      </section>



      <section className="flex flex-col lg:flex-row items-center gap-16 mb-16">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Four-Wheeler Parts</h3>
          <p className="text-lg text-gray-600">
            Our wide selection of spare parts for four-wheelers includes components that ensure your car runs efficiently, safely, and at its best performance. From suspension systems to engine components, we have everything you need for your vehicle.
          </p>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src="/images/slide4.jpg"
            alt="Four-Wheeler Parts"
            className="w-full h-[400px] object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
      </section>

   
    </div>
  );
}

export default About;
