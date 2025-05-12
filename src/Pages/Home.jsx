import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    e.target.reset(); // Optional: clears the form
    setTimeout(() => setFormSubmitted(false), 3000); // Hide message after 3s
  };

  const slides = [
    {
      image: "/images/slide2.jpg",
      title: "Premium Engine Parts",
      description:
        "Boost your vehicle's performance with top-quality engine components.",
    },
    {
      image: "/images/slide3.jpg",
      title: "Reliable Body Parts",
      description:
        "Explore durable and affordable body parts for all car models.",
    },
    {
      image: "/images/slide4.jpg",
      title: "Automotive Electronics",
      description:
        "Upgrade with the latest auto-electronics and smart solutions.",
    },
  ];

  const totalSlides = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const cards = [
    {
      title: "Four Wheeler Parts",
      description:
        "Discover an extensive range of high-quality car spare parts designed to ensure exceptional durability and top-tier performance. Whether you're looking for engines, suspensions, brakes, or guarantee your vehicle stays in peak condition for longer, no matter the journey ahead.",
      image: "/images/fourwheeler2.jpg",
      link: "/fourwheeler",
    },
    {
      title: "Two Wheeler Parts",
      description:
        "Explore our wide range of motorcycle spare parts, including engines, brakes, and accessories, designed for all bike models. From essential components to performance upgrades, we provide high-quality parts to enhance your bike's durability and performance.",
      image: "/images/twowheeler1.jpg",
      link: "/twowheeler",
    },
  ];

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
          Find high-quality spare parts for your two-wheelers and four-wheelers
          all in one place. From essential components to performance upgrades,
          we've got the parts you need to keep your vehicle running smoothly.
        </p>

        <Link
          to={"/search"}
          className="text-blue-800 font-bold text-lg hover:underline transition-all duration-300 transform hover:scale-105"
        >
          Let's Explore...
        </Link>
      </div>
      <div className="min-h-screen bg-gray-50 px-6 py-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-slate-800 mb-10 text-center">
          Our Spare Parts Collection
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="transform transition duration-300 ease-in-out hover:scale-105"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-110 group-hover:opacity-90"
                />
                <div className="p-6 transition-all duration-300">
                  <h2 className="text-2xl font-semibold text-slate-800 mb-2 transform transition duration-500 hover:text-indigo-600">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 text-base leading-relaxed transform transition duration-500 hover:text-indigo-600 hover:scale-105">
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div
          className="bg-white py-12 px-6 md:px-12 mt-20 shadow-md	"
          id="contact"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
              Get in Touch With Us
            </h2>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
              Have a question about spare parts, orders, or services? Our team
              is here to help you with the right solutions for your two-wheeler
              and four-wheeler needs.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-700">
                    📍 Our Address
                  </h3>
                  <p className="text-gray-600">
                    123 Auto Street, Spare City, IN 560001
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-700">
                    📞 Call Us
                  </h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-700">
                    ✉️ Email
                  </h3>
                  <p className="text-gray-600">autosparex.com</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-700">
                    🕒 Working Hours
                  </h3>
                  <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                </div>
              </div>

              {/* Contact Form */}
              <form
                onSubmit={handleFormSubmit}
                className="bg-gray-100 p-6 rounded-xl shadow-md space-y-4"
              >
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-800"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-800"
                  required
                />
                <textarea
                  rows="5"
                  placeholder="Your Message"
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-800"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 rounded transition duration-300"
                >
                  Send Message
                </button>
                {formSubmitted && (
                  <p className="text-green-600 font-semibold mt-4 text-center">
                    Message submitted successfully!
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
