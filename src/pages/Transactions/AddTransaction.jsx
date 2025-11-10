

  import React, { use, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
  
  const AddTransaction = () => {
    const { user } = use(AuthContext);
    const [formData, setFormData] = useState({
        type: "Income",
        category: "",
        amount: "",
        description: "",
        date: "",
        userEmail: user?.email || "",
        userName: user.displayName || ""
    })
    const handleChange = (e) => {
       setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const res = await fetch("http://localhost:3000/transactions", {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
            toast.success("Transaction added successfully!");
            setFormData({
                type: "Income",
        category: "",
        amount: "",
        description: "",
        date: "",
        userEmail: user?.email,
        userName: user.displayName
            })
        } else {
            toast.error(data.message || "Failed to add transaction")
        }
    } catch(error){
        toast.error("Server error! Please try again.")
    }
    }
    
    return (
        <div className='max-w-md mx-auto p-5'>
            <h1 className="text-2xl font-bold">Login now!</h1>
            <form onSubmit={handleSubmit}>
                <select defaultValue="Pick a type" name='type' value={formData.type} onChange={handleChange}  className="select select-ghost">
  <option disabled={true}>Type</option>
  <option value="Income">Income</option>
  <option value="Expense">Expense</option>
</select>

<input type="text" name='category' value={formData.category} onChange={handleChange} placeholder="Category" className="input input-bordered" required />

<input type="number" name='amount' value={formData.amount} onChange={handleChange} placeholder="Amount" className="input input-bordered" required />

<textarea type="description" name='description' value={formData.description} onChange={handleChange} className=" textarea textarea-bordered" placeholder="Description"></textarea>

<input type="date" name='date' value={formData.date} onChange={handleChange} placeholder="Date" className="input input-bordered" required />

<button type='submit' className="btn btn-active btn-info text-white">Add</button>
            </form>
            
        </div>
    );
  };
  
  export default AddTransaction;


 