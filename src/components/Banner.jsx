import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Banner Component
const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      image: "/banner1.png",
      title: "Manage Your Money, Shape Your Future",
      subtitle:
        "Take control of your income, expenses, and savings goals with FinEase - your all-in-one personal finance management solution.",
      gradient: "from-purple-900/80 to-blue-900/60",
    },
    {
      id: 2,
      image: "/banner2.png",
      title: "Master Your Money with Confidence",
      subtitle:
        "Track spending, set budgets, and grow your savings effortlessly.",
      gradient: "from-blue-900/80 to-indigo-900/60",
    },
    {
      id: 3,
      image: "/banner3.png",
      title: "Your Finances, Simplified",
      subtitle: "Smart tracking. Clear insights. Better control—all in one app.",
      gradient: "from-indigo-900/80 to-purple-900/60",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-2xl shadow-2xl group">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              {slide.title}
            </h2>
            <p className="max-w-2xl text-base md:text-xl opacity-95">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full text-white"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 p-3 rounded-full text-white"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Banner;
