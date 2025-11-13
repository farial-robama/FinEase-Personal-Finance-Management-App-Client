import React, { useState } from 'react';
import { useEffect } from 'react';

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
        const income = data.filter((t) => t.type === "income").reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

        const expense = data.fiter((t) => t.type === "expense").reduce((acc,curr) => acc + parseFloat(curr.amount), 0);
        const balance = income - expense;
        setSummary({ income, expense, balance })
    }

    return (
        <div className='my-10'>
            <h2 className='text-2xl font-semibold text-center mb-7'>Overview</h2>
            <div className='flex gap-4 justify-center'>
                <div className='bg-[#1D546C] rounded-2xl px-10 py-15 w-full text-center'>
                    <h1 className='text-white'>Total Income</h1>
                    <p className='text-white'>${summary.income}</p>
                </div>
                <div className='bg-[#658C58] rounded-2xl px-10 py-15 w-full text-center'>
                    <h1 className='text-white'>Total Expense</h1>
                    <p className='text-white'>${summary.expense}</p>
                </div>
                <div className='bg-[#8FABD4] rounded-2xl px-10 py-15 w-full text-center'>
                    <h1 className='text-white'>Balance</h1>
                    <p className='text-white'>${summary.balance}</p>
                </div>
            </div>
            
        </div>
    );
};

export default Overview;