import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/slide2.jpg",
      title: "Premium Engine Parts",
      description: "Boost your vehicle's performance with top-quality engine components.",
    },
    {
      image: "/images/slide3.jpg",
      title: "Reliable Body Parts",
      description: "Explore durable and affordable body parts for all car models.",
    },
    {
      image: "/images/slide4.jpg",
      title: "Automotive Electronics",
      description: "Upgrade with the latest auto-electronics and smart solutions.",
    },
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    
<div className="p-4">

      {/* //CAROSEL  */}
      <div className="relative w-full h-[500px] overflow-hidden mb-20 rounded-xl shadow-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="min-w-full h-[500px] relative">
              <img
                src={slide.image}
                alt={`Slide ${idx}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />

              //CONTENT OVERLAY
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-20">
                <h1 className="text-4xl md:text-5xl font-bold drop-shadow-md mb-2">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl drop-shadow-sm">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>


          {/* //ARROWS */}

        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
          }
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full z-30"
        >
          &#8592;
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full z-30"
        >
          &#8594;
        </button>
           
           {/* //SLIDE INDICATOR */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === idx ? "bg-white" : "bg-white/50"
              } transition-all duration-300`}
            />
          ))}
        </div>
        
      </div>
      <div className="flex flex-col items-center gap-4 mb-10">
  <p className="text-gray-500 text-base lg:text-lg max-w-2xl leading-relaxed text-center">
    Sahand Estate is the best place to find your next perfect place to live. <br />
    We have a wide range of properties for you to choose from.
  </p>
  <Link
  to={"/search"}
  className="text-blue-800 font-bold text-lg hover:underline transition-all duration-300 transform hover:scale-105"
>
  Let's Explore...
</Link>

</div>
      
    </div>
    
  );
}

export default Home;
