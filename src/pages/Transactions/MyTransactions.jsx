import React, { use, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';
import Swal from 'sweetalert2';
import TransactionCard from './TransactionCard';

const MyTransactions = () => {
    const { user, loading } = use(AuthContext);
    const [ transactions, setTransactions ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        if (!user.email) return;

        fetch(`http://localhost:3000/transactions/${user.email}`)
        .then(res => res.json())
        .then(data => {
            setTransactions(data)
            setIsLoading(false)
        })
        .catch(() => setIsLoading(false))
    }, [user])

    const handleDelete = (id) => {
        Swal.fire({
  title: "Are you sure?",
  text: "This transaction will be permanently deleted.",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Yes, delete it!"
})
.then((result) => {
    if (result.isConfirmed) {
        fetch(`http://localhost:3000/transactions/${id}`, {
            method: "DELETE",
        })
        .then(res => res.json())
        .then(data => {
            if (data.deletedCount > 0) {
                Swal.fire("Deleted!", "Transaction removed successfully", "success");
                setTransactions(transactions.filter((t) => t._id !== id))
            }
        })
    }
});
    }
    return (
        <div className='mx-auto'>
            <h2 className='font-bold text-xl '>My Transactions ({transactions.length})</h2>
            <div className='flex flex-col gap-5'>
                {
                    transactions.map((transaction) => (
                        <TransactionCard key={transaction._id} transaction={transaction} onDelete={handleDelete}></TransactionCard>
                    ))
                }
            </div>
            
        </div>
    );
};

export default MyTransactions;