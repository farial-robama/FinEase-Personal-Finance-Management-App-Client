
import React from 'react';

const Banner = () => {
  return (
    <div className="carousel w-full">

       <div id="slide1" className="carousel-item relative w-full">
    <img
      src="/banner1.png"
      className="w-full h-80 brightness-50" />
      <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6'>
        <h2 className='text-3xl font-bold mb-4'>Manage Your Money, Shape Your Future</h2>
        <p>Take control of your income, expenses, and savings goals with FinEase - your all-in-one personal finance manament solution.</p>
      </div>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>


  <div id="slide2" className="carousel-item relative w-full">
    <img
      src="/banner2.png"
      className="w-full h-80 brightness-40" />
      <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6'>
        <h2 className='text-3xl font-bold mb-4'>Master Your Money with Confidence</h2>
        <p>Track spending, set budgets, and grow your savings effortlessly. <br />FinEase helps you make smarter financial decisions every day.</p>
      </div>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>


  <div id="slide3" className="carousel-item relative w-full">
    <img
      src="/banner3.png"
      className="w-full h-80 brightness-45" />
      <div className='absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6'>
        <h2 className='text-3xl font-bold mb-4'>Your Finances, Simplified</h2>
        <p>Smart tracking. Clear insights. Better control-all in one app.</p>
      </div>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide4" className="btn btn-circle">❮</a>
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div>
  
</div>
  );
};

export default Banner;