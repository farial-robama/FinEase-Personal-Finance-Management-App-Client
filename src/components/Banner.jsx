import React from 'react';

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className='flex flex-col gap-3.5'>
        <img src="/banner.png" className="max-w-sm rounded-lg shadow-2xl"/>
    <img src="/banner2.png" className="max-w-sm rounded-lg shadow-2xl" />
    <img src="/banner3.png" className="max-w-sm rounded-lg shadow-2xl" />
    </div>
    <div className='w-xl'>
      <h1 className="text-5xl font-bold">Personal Finance Management</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    );
};

export default Banner;