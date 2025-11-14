import { div } from 'framer-motion/m';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router';

const Overview = () => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({ income: 0, expense: 0, balance:0 })

    useEffect(() => {
        fetch("https://finease-personal-finance-management.vercel.app/transactions")
        .then((res) => res.json())
        .then((data) => {
            setTransactions(data);
            calculateSummary(data);
        })
    }, [])

    const calculateSummary = (data) => {
        const income = data.filter((t) => t.type === "Income").reduce((acc, curr) => acc + parseFloat(curr.amount || 0 ), 0);

        const expense = data.filter((t) => t.type === "Expense").reduce((acc,curr) => acc + parseFloat(curr.amount || 0 ), 0);
        const balance = income - expense;
        setSummary({ income, expense, balance })
    }


const cards = [
    {title: "Total Income", value: summary.income, color: "from-[#3A6F43] to-[#799EFF]"},
    {title: "Total Expense", value: summary.expense, color: "from-[#FB4141] to-[#FF9B2F]"},
    {title: "Balance", value: summary.balance, color: "from-blue-600 to-[#9B5DE0]"}
]



    return (
        <div className='bg-[#c7dbc5] p-7 rounded-2xl my-10'>
            <h2 className='text-gray-800 text-2xl font-semibold text-center mb-7'>Overview</h2>
            <div className='flex gap-4 justify-center'>
                {cards.map((card, index) => (
                    <div key={index} className={`relative w-64 h-48 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center overflow-hidden shadow-2xl`}>
                        <div className='absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_white] animate-ping-slow top-5 right-5'></div>

                        <div className='absolute w-56 h-10 bg-white/20 rounded-full blur-xl animate-spin-slow'></div>

                        <div className='relative z-10 text-center'>
                        <h1 className='text-lg md:text-xl font-bold text-white'>{card.title}</h1>
                        <p className='text-xl font-extrabold text-white'>${card.value}</p>
                    </div>
                    </div>
                ))}
               
            </div>
           <div className='text-center my-10'>
             <Link to="/transaction/my" className='button'>See Your Transaction</Link>
           </div>
        </div>
    );
};

export default Overview;