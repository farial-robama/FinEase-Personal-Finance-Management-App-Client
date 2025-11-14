import React from 'react';

const SmartFinance = () => {
    return (
        <div className='mx-auto'>
            <div className='flex justify-between gap-7 items-center my-15'>
                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl font-bold'>Why Financial Planning Matters?</h1>
                <p className='text-gray-600 text-xl'>Every financial decision shapes your future. <span>FinEase</span> empowers you to plan, track, and achieve financial goals with ease and confidence.</p>
                </div>
                <img className='rounded-md' src="/finance2.png" alt="image" />
            </div>

            <div className='flex justify-between items-center my-7'>
                <img className='rounded-md' src="/finance1.png" alt="image" />
                <div className='flex flex-col gap-5'>
                    <h1 className='text-3xl font-bold'>Budgeting Tips</h1>
                <p className='text-gray-600 text-xl'>- Track every expense, no matter how small. <br />
                - Set monthly spending limits for each category. <br />
                - Always pay yourself first - save before you spend. <br />
                - Review and adjust your budget regularly. <br />
                - Use tools like FinEase to automate tracking and gain insights.</p>
                </div>
            </div>
            
        </div>
    );
};

export default SmartFinance;
