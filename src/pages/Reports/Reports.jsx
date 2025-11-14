import React, { use, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip, plugins } from 'chart.js';
import { title } from 'framer-motion/m';
import useTitle from '../../Hooks/useTitle';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const Reports = () => {
    useTitle("Reports")

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

    const txDate = transaction.date ? new Date(transaction.date) : new Date(transaction.createdAt || null);
    return txDate.getMonth() + 1 === parseInt(month);
})

const incomeTransactions = filteredTransactions.filter(tx => tx.type === "Income")
const expenseTransactions = filteredTransactions.filter(tx => tx.type === "Expense")

const calculateCategoryTotals = (txArray) => {
    return txArray.reduce((acc,tx) => {
        const amt = parseFloat(tx.amount || 0)
    if (!acc[tx.category]) acc[tx.category] = 0; 
    acc[tx.category] +=amt;
    return acc;
    }, {})
}


const incomeCategoryTotals = calculateCategoryTotals(incomeTransactions);
const expenseCategoryTotals = calculateCategoryTotals(expenseTransactions);


const incomePieData = {
    labels: Object.keys(incomeCategoryTotals).length ? Object.keys(incomeCategoryTotals) : ["No data"],
    datasets: [
        {
            label: "Category Distribution",
            data: Object.values(incomeCategoryTotals),
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



const expensePieData = {
    labels: Object.keys(expenseCategoryTotals).length ? Object.keys(expenseCategoryTotals) : ["No data"],
    datasets: [
        {
            label: "Category Distribution",
            data: Object.values(expenseCategoryTotals),
            backgroundColor: [
                "#8C00FF",
                "#92487A",
                "#DC0E0E",
                "#FE6244",
                "#FE6244",
                "#92487A"
            ]
        }
    ]
}

const calculateMonthlyTotals = (txArray) => {
    return txArray.reduce((acc,tx) => {
        const monthNum = new Date(tx.date).getMonth() + 1;
    if (!acc[monthNum]) acc[monthNum] = 0;
    acc[monthNum] +=tx.amount;
    return acc;
    }, {})
}


const monthlyIncomeTotals = calculateMonthlyTotals(incomeTransactions);
const monthlyExpenseTotals = calculateMonthlyTotals(expenseTransactions);



const incomeBarData = {
    labels: Array.from({ length: 12}, (_, i) => `Month ${i + 1}`),
    datasets: [
        {
            label: "Monthly Totals",
            data: Array.from({ length: 12 },(_, i) => monthlyIncomeTotals[i + 1] || 0 ),
            backgroundColor: "#36A2EB"
        }
    ]
}

const expenseBarData = {
    labels: Array.from({ length: 12}, (_, i) => `Month ${i + 1}`),
    datasets: [
        {
            label: "Monthly Totals",
            data: Array.from({ length: 12 },(_, i) => monthlyExpenseTotals[i + 1] || 0 ),
            backgroundColor: "#FF6384"
        }
    ]
}


const options = {
    responsive: true,
    maintainAspectRatio: false,
    
}

    return (
        <div className='mx-auto my-7'>
            <h1 className='text-2xl font-bold text-center text-gray-800 mb-10'>Finalcial Reports</h1>

            <div className='mb-15 text-center'>
                <label className='mr-3 font-semibold text-gray-800'>Filter by month</label>
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


                <div className='flex flex-col md:flex-row gap-18 items-center justify-center'>
                    <div >
                <h2 className='text-xl text-center  font-semibold text-gray-800 mb-8'>Income by Category</h2>
                <div className='w-60 md:w-full h-80 mx-auto'>
                    <Pie data={incomePieData}  options={options}></Pie>
                </div>
            </div>
            <div className=''>
                <h2 className='text-xl text-center font-semibold text-gray-800 mb-8'>Expense by Category</h2>
                <div className='w-60 md:w-full max-w-sm h-80 mx-auto'>
                    <Pie data={expensePieData}  options={options}></Pie>
                </div>
            </div>
                </div>
           

            <div className='mt-18 border-gray-400 border-t border-dashed'>
                <h2 className='text-xl text-center font-semibold text-gray-800 mt-5 mb-8'>Monthly Income</h2>
                <div className='w-full h-80 mx-auto'>
                    <Bar data={incomeBarData} options={options}></Bar>
                </div>
            </div>
            <div className='mt-18'>
                <h2 className='text-xl text-center font-semibold text-gray-800 mb-8'>Monthly Expense</h2>
                <div className='w-full h-80 mx-auto'>
                    <Bar data={expenseBarData} options={options}></Bar>
                </div>
            </div>
            
        </div>
    );
};

export default Reports;