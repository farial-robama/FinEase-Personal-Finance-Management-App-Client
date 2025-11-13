import React, { use, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const Reports = () => {
    const { user } = use(AuthContext)
    const [transactions, setTransactions] = useState([]);
    const [month, setMonth] = useState("")
 
    

useEffect(() => {
    if (!user) return;
    fetch(`https://finease-personal-finance-management.vercel.app/transactions/${user.email}`)
    .then((res) => res.json())
    .then((data) => setTransactions(data))
    .catch((err) => console.error("Error fetching transactions:", err))
}, [user])

const filteredTransactions = transactions.filter((transaction) => {
    if (!month) return true;
    return new Date(transaction.date).getMonth() + 1 === parseInt(month);
})

const categoryTotals = filteredTransactions.reduce((acc, tx) => {
    if (!acc[tx.category]) acc[tx.category] = 0; 
    acc[tx.category] +=tx.amount;
    return acc;
}, {})


const pieData = {
    labels: Object.keys(categoryTotals).length ? Object.keys(categoryTotals) : ["No data"],
    datasets: [
        {
            label: "Category Distribution",
            data: Object.values(categoryTotals),
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#8FABD4",
                "#C2E2FA",
                "#C4F0C5"
            ]
        }
    ]
}

const monthlyTotals = filteredTransactions.reduce((acc,tx) => {
    const monthNum = new Date(tx.date).getMonth() + 1;
    if (!acc[monthNum]) acc[monthNum] = 0;
    acc[monthNum] +=tx.amount;
    return acc;
}, {})

const barData = {
    labels: Array.from({ length: 12}, (_, i) => `Month ${i + 1}`),
    datasets: [
        {
            label: "Monthly Totals",
            data: Array.from({ length: 12 },(_, i) => monthlyTotals[i + 1] || 0 ),
            backgroundColor: "#36A2EB"
        }
    ]
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
}

    return (
        <div className='mx-auto'>
            <h1 className='text-2xl font-bold text-center mb-10'>Finalcial Reports</h1>

            <div className='mb-10 text-center'>
                <label className='mr-3 font-semibold'>Filter by month</label>
                <select
              defaultValue="Text"
              name="type"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="select select-bordered"
              required
            >
              <option value="" >All Months</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            </div>

            <div>
                <h2 className='text-xl font-semibold mb-2'>Category Distribution</h2>
                <div className='w-full h-80 mx-auto'>
                    <Pie data={pieData}  options={options}></Pie>
                </div>
            </div>

            <div>
                <h2 className='text-xl font-semibold mb-2'>Monthly Totals</h2>
                <div className='w-full h-80 mx-auto'>
                    <Bar data={barData} options={options}></Bar>
                </div>
            </div>
            
        </div>
    );
};

export default Reports;