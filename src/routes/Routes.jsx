
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import AddTransaction from "../pages/Transactions/AddTransaction";
import MyTransactions from "../pages/Transactions/MyTransactions";
import Reports from "../pages/Reports/Reports";
import MyProfile from "../pages/Profile/MyProfile";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import TransactionDetails from "../pages/Transactions/TransactionDetails";
import UpdateTransaction from "../pages/Transactions/UpdateTransaction";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/add-transaction",
                element:(
                    <PrivateRoute><AddTransaction></AddTransaction></PrivateRoute>
                )
            },
            {
                path: "/my-transactions",
                element: (
                    <PrivateRoute><MyTransactions></MyTransactions></PrivateRoute>
                )
            },
            {
                path: "/my-transactions/:id",
                element: <TransactionDetails></TransactionDetails>
            },
            {
                path: "/my-transactions/update/:id",
                element: <UpdateTransaction></UpdateTransaction>
            },
            {
                path: "/reports",
                element: <Reports></Reports>
            },
            {
                path: "/my-profile",
                element: <MyProfile></MyProfile>
            },
            {
                path: "/auth/login",
                element: <Login></Login>
            },
            {
                path: "/auth/register",
                element: <Register></Register>
            }
        ]
    }
])