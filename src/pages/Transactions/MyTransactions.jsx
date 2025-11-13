import React, { use, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useState } from "react";
import Swal from "sweetalert2";
import TransactionCard from "./TransactionCard";
import Loader from "../../components/Loader";
import { Navigate, useLocation } from "react-router";
import UpdateTransaction from "./UpdateTransaction";


const MyTransactions = () => {
  const { user, loading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [sortOrder, setSortOrder] = useState("");
 

  
    useEffect(() => {
      const fetchTransactions = async () => {
      if (!user) return;
      setIsLoading(true);

      try {
        // let query = "";
        // if (sortOrder === "date-asc")
        //   query = "sortField=createdAt&sortOrder=asc";
        // else if (sortOrder === "date-desc")
        //   query = "sortField=createdAt&sortOrder=desc";
        // else if (sortOrder === "amount-asc")
        //   query = "sortField=amount&sortOrder=asc";
        // else if (sortOrder === "amount-desc")
        //   query = "sortField=amount&sortOrder=desc";

        const res = await fetch(
          `https://finease-personal-finance-management.vercel.app/transactions/${user.email}`,
          {
            headers: {"Content-Type": "application/json"},
          }
        );
        const data = await res.json();
        const transactionsArray = Array.isArray(data) ? data : data?.transactions || []

        setTransactions(transactionsArray);
        
      } catch (err) {
        console.error("Error fetching transactions", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
    }, [user])
  

  

  if (loading) {
    return <Loader></Loader>;
  }
  if (!user) {
    return <Navigate to="/auth/login" replace></Navigate>;
  }
  
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This transaction will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://finease-personal-finance-management.vercel.app/transactions/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();
        if (data.deletedCount > 0) {
          Swal.fire("Deleted!", "Transaction removed successfully", "success");
          setTransactions(transactions.filter((t) => t._id !== id));
        }
      } catch (err) {
        console.error("Error deleting transaction", err);
      }
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortOrder === "date-asc") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortOrder === "date-desc") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOrder === "amount-asc") {
      return a.amount - b.amount;
    } else if (sortOrder === "amount-desc") {
      return b.amount - a.amount;
    }
    return 0;
  });

  const handleUpdate = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-xl ">
          My Transactions ({transactions.length})
        </h2>

        {/* Sort Bar */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            Sort ⬇️
          </div>
          <ul
            tabIndex="-1"
            className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li>
              <details>
                <summary>Date</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <a onClick={() => setSortOrder("date-desc")}>
                      Newest First
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setSortOrder("date-asc")}>Oldest First</a>
                  </li>
                </ul>
              </details>
            </li>

            <li tabIndex={0}>
              <details>
                <summary>Amount</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <a onClick={() => setSortOrder("amount-desc")}>
                      High to Low
                    </a>
                  </li>
                  <li>
                    <a onClick={() => setSortOrder("amount-asc")}>
                      Low to High
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      {/* Transactions List */}
      {isLoading ? (
        <Loader></Loader>
      ) : sortedTransactions.length === 0 ? (
      
        <p className="text-gray-400 font-bold">No data found</p>
      ) : (
        <div className="flex flex-col gap-5">
          {sortedTransactions.map((transaction) => (
            <TransactionCard
              key={transaction._id}
              transaction={transaction}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            ></TransactionCard>
          ))}
        </div>
      )}

      {/* update transaction */}
      {isModalOpen && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
            <UpdateTransaction
              transaction={selectedTransaction}
              onClose={async (updated) => {
                setIsModalOpen(false);
                if (updated) {
                  const res = await fetch(
                    `https://finease-personal-finance-management.vercel.app/transactions/id/${selectedTransaction._id}` );
                  const data = await res.json();
                  setSelectedTransaction(data);
                }
              }}
            ></UpdateTransaction>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTransactions;
