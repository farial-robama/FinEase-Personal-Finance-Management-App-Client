import React, { use, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import Swal from "sweetalert2";
import TransactionCard from "./TransactionCard";
import Loader from "../../components/Loader";
import { Navigate } from "react-router";

const MyTransactions = () => {
  const { user, loading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    if (!user) return;
    setIsLoading(true)

    fetch(`http://localhost:5000/transactions/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [user]);

  if (loading) {
        return <Loader></Loader>
      }
      if (!user) {
        return <Navigate to="/auth/login" replace></Navigate>
      }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/transactions/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                "Transaction removed successfully",
                "success"
              );
              setTransactions(transactions.filter((t) => t._id !== id));
            }
          });
      }
    });
  };


  const sortedTransactions = [...transactions].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

 

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-xl ">
        My Transactions ({transactions.length})
      </h2>

      {/* Sort Bar */}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          Sort by date ⬇️
        </div>
        <ul
          tabIndex="-1"
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li>
            <a onClick={() => setSortOrder("desc")}>Newest First</a>
          </li>
          <li>
            <a onClick={() => setSortOrder("asc")}>Oldest First</a>
          </li>
        </ul>
      </div>
      </div>
      {/* Transactions List */}
      { isLoading ? <Loader></Loader> : transactions.length === 0 ? (<p className="text-gray-400 font-bold">No data found</p>) : (
        <div className="flex flex-col gap-5">
        {sortedTransactions.map((transaction) => (
          <TransactionCard
            key={transaction._id}
            transaction={transaction}
            onDelete={handleDelete}
          ></TransactionCard>
        ))}
      </div>
      )}
    </div>
  );
};

export default MyTransactions;
