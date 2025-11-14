import React from "react";
import { Link } from "react-router";

const SmartFinance = () => {
  return (
    <div className="mx-auto">
      <div className="flex flex-col-reverse md:flex-row gap-10 justify-between items-center my-15">
        <div className="flex flex-col gap-5">
          <h1 className=" text-gray-600 text-3xl font-bold">
            Why Financial Planning Matters?
          </h1>
          <p className="text-gray-600 text-xl">
            Every financial decision shapes your future. <br /> <span className="font-bold">FinEase</span>{" "}
            empowers you to plan, track, and achieve financial goals with ease
            and confidence.
          </p>
        </div>
        
          <img className="rounded-md md:w-130 w-full" src="/finance2.png" alt="image" />
        
      </div>

      <div className="flex flex-col md:flex-row gap-7 justify-between items-center my-7">
        <img className="rounded-md md:w-130 w-full" src="/finance1.png" alt="image" />
        <div className="flex flex-col gap-5">
          <h1 className="text-gray-600 text-3xl font-bold">Budgeting Tips</h1>

          <ul className="steps steps-vertical text-gray-600 text-lg">
            <li className="step step-primary">
              Track every expense, no matter how small
            </li>
            <li className="step step-primary">
              Set monthly spending limits for each category
            </li>
            <li className="step step-primary">
              Always pay yourself first - save before you spend
            </li>
            <li className="step step-primary">
              Review and adjust your budget regularly
            </li>
            <li className="step step-primary">
              Use tools like FinEase to automate tracking and gain insights
            </li>
          </ul>
        </div>
      </div>

      <div className='text-center my-10'>
             <Link to="/transaction" className='button'>Add Your Transaction</Link>
           </div>

    </div>
  );
};

export default SmartFinance;
