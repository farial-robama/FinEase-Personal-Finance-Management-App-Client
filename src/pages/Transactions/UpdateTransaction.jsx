
import { use, useState } from "react";

import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthContext";
import useTitle from "../../Hooks/useTitle";

const UpdateTransaction = ({ transaction, onClose }) => {
  useTitle("Update Transaction")

  const { user } = use(AuthContext);

  const incomeCategories = [
    "Salary",
    "Business",
    "Invesment",
    "Gift",
    "Others",
  ];
  const expenseCategories = ["Food", "Transport", "Rent", "Shopping", "Bills"];

  if (!transaction) return null;

  const [formData, setFormData] = useState({
    type: transaction.type,
    category: transaction.category,
    amount: transaction.amount,
    description: transaction.description,
    date: transaction.date.slice(0, 10),
    // userEmail: user?.email || "",
    // userName: user?.displayName || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://finease-personal-finance-management.vercel.app/transactions/${transaction._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.success("Transaction updated successfully!");
        onClose(true);
      } else {
        toast.error(data.message || "Failed to update transaction");
      }
    } catch (err) {
      toast.error("Server error! Please try again.");
    }
  };
  return (
    <div className="max-w-md mx-auto text-center bg-[#8FABD4] rounded-md p-3">
      <h1 className="text-2xl font-bold">Update Transaction</h1>
      <div className="card-body">
        <form onSubmit={handleSubmit} className=" flex flex-col space-y-2.5">
          <fieldset className="fieldset">
            <select
              defaultValue="Text"
              name="type"
              value={formData.type || ""}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                Pick a type
              </option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>

            <select
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled>
                {" "}
                Pick a category
              </option>
              {(formData.type === "Income"
                ? incomeCategories
                : expenseCategories
              ).map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="input input-bordered w-full"
              required
            />

            <textarea
              type="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className=" textarea textarea-bordered w-full"
              placeholder="Description"
            ></textarea>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date"
              className="input input-bordered w-full"
              required
            />
            <div className="flex gap-3 justify-end mt-3">
              <button
                type="submit"
                className="btn btn-active bg-[#C2E2FA] text-[#39505a] cursor-pointer"
              >
                Update
              </button>
              <button
                onClick={() => onClose(false)}
                className="btn btn-active bg-[#C2E2FA] text-[#39505a] cursor-pointer"
              >
                {" "}
                Cancel
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransaction;
