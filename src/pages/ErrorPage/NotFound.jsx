import React from 'react';
import { useNavigate } from 'react-router';

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="text-center flex flex-col items-center p-20">
      <img src="/error-404.png" alt="" />
      <h1 className="text-2xl font-bold pt-3.5">Oops, page not found!</h1>
      <p className="text-sm text-[#627382] pb-3.5">
        The page you are looking for is not available.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="button"
      >
        Go Back
      </button>
    </div>
    );
};

export default NotFound;

