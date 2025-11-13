import React, { use, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import Loader from "../../components/Loader";
import { AuthContext } from "../../contexts/AuthContext";
import { FaCalendarDay, FaCross, FaDailymotion } from "react-icons/fa";
import { motion } from "framer-motion";
import UpdateTransaction from "./UpdateTransaction";

const TransactionDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const [transaction, setTransaction] = useState(null);
  const [allTransaction, setAllTransaction] = useState([]);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user || !id) return;

      setIsLoading(true);
      try {
        
        console.log(token);

        const res = await fetch(
          `https://finease-personal-finance-management.vercel.app/transactions/id/${id}`,
          {
            headers: {"Content-Type": "application/json"},
          }
        );
        const data = await res.json();
        setTransaction(data);
      } catch (err) {
        console.error("Error fetching transaction", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, [user, id]);

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
            headers: {"Content-Type": "application/json"},
          }
        );
        const data = await res.json();
        if (data.deletedCount > 0) {
          Swal.fire("Deleted!", "Transaction removed successfully", "success");
          navigate("/my-transactions");
        }
      } catch (err) {
        console.error("Error deleting transaction", err);
      }
    }
  };

  if (isLoading) {
    return <Loader></Loader>;
  }
  if (!transaction) {
    return <p className="text-gray-500 font-bold">No Data Found</p>;
  }

  return (
    <div>
      <motion.div
        className="card w-96 shadow-sm mx-auto bg-[#dcf3f5] border-2 border-[#cec0a9]
        "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.06 }}
      >
        <div className="card-body">
          <span className="badge badge-xs white-outline bg-[#ECF4E8]">
            See Details!
          </span>
          <div className="flex justify-between items-center border-b border-dashed border-gray-500 pb-3">
            <h2 className="text-3xl font-bold">{transaction.type}</h2>
            <span className="text-3xl">${transaction.amount}</span>
          </div>
          <div className="flex flex-col border-b border-dashed border-gray-500 pb-3">
            <h1 className="pb-2 font-semibold">Category</h1>
            <p className="text-xs text-gray-600">{transaction.category}</p>
          </div>
          <div className="flex flex-col border-b border-dashed border-gray-500 pb-3">
            <h1 className="pb-2 font-semibold">Description</h1>
            <p className="text-xs text-gray-600">{transaction.description}</p>
          </div>
          <div className="flex flex-col border-b border-dashed border-gray-500 pb-3">
            <h1 className="pb-2 font-semibold">Date</h1>
            <p className="flex items-center gap-3">
              <FaCalendarDay></FaCalendarDay>
              {new Date(transaction.date).toLocaleDateString()}
            </p>
          </div>

          <div className="card-actions justify-end pt-3.5">
            <div
              onClick={() => setIsModalOpen(true)}
              className="badge white-outline bg-[#c9dcc0] cursor-pointer"
            >
              Update
            </div>
            <div
              onClick={() => handleDelete(transaction._id)}
              className="badge white-outline bg-[#c9dcc0] cursor-pointer"
            >
              Delete
            </div>
          </div>
        </div>
      </motion.div>

      {isModalOpen && transaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg relative">
            <UpdateTransaction
              transaction={transaction}
              onClose={async (updated) => {
                setIsModalOpen(false);
                if (updated) {
                  
                  const res = await fetch(
                    `https://finease-personal-finance-management.vercel.app/transactions/id/${id}`,
                    {
                      headers: {"Content-Type": "application/json"},
                    }
                  );
                  const data = await res.json();
                  setTransaction(data);
                }
              }}
            ></UpdateTransaction>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionDetails;
