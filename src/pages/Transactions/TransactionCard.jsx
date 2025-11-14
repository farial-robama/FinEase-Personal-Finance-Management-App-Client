import React from 'react';
import { Link } from 'react-router';

const TransactionCard = ({transaction, onDelete, onUpdate}) => {
    const {_id, category, type, amount, date} = transaction;

    const incomeIcon = "https://img.icons8.com/?size=100&id=FxcjMqAjmqCG&format=png&color=000000"
    const expenseIcon = "https://img.icons8.com/?size=100&id=36947&format=png&color=000000"
    const dateIcon ="https://img.icons8.com/?size=100&id=WpQIVxfhhzqt&format=png&color=000000"
    return (
        <div className='flex flex-col md:flex-row gap-5 justify-between bg-[#FFFF] p-6 rounded-md shadow-md'>
             <div className='flex flex-col items-start gap-2.5'>
                <div className='flex gap-3 items-center'>
            
                    <img src={type === "Income" ? incomeIcon : expenseIcon} alt={type} className='w-10'/>
            
                <h1 className={type === "Income" ? "text-[#3A6F43] font-bold text-3xl" : "text-[#DC143C] font-bold text-3xl"}>${amount}</h1>
                </div>
                <p className='badge white-outline bg-[#c9dcc0] text-[#267979] rounded-md px-2 py-1'>{category}</p>
               <p className='flex gap-2 items-center'>
                <img src={dateIcon} className='w-5' /><span className='text-gray-800'>{date}</span></p>
            </div>
            
            <div className='flex md:flex-col gap-2 md:items-end'>
                <Link to={`/transaction/details/${_id}`} className="btn btn-info rounded-2xl px-2 py-1">View Details</Link>
            <button onClick={() => onUpdate(transaction)} className="btn btn-success rounded-2xl px-2 py-1">Update</button>
            <button onClick={() => onDelete(_id)} className="btn btn-warning rounded-2xl px-2 py-1">Delete</button>
            </div>
        </div>
    );
};

export default TransactionCard;