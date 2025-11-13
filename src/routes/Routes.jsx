import { createBrowserRouter, Outlet } from "react-router";
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
import UpdateProfile from "../pages/Profile/UpdateProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/transaction",
        element: (
          <PrivateRoute>
            <Outlet></Outlet>
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <AddTransaction></AddTransaction>
          },
          {
            path: "my",
            element: <MyTransactions></MyTransactions>,
          },
          {
            path: "details/:id",
            element: <TransactionDetails></TransactionDetails>,
          },
          {
            path: "update/:id",
            element: <UpdateTransaction></UpdateTransaction>,
          },
        ],
      },
      {
        path: "/reports",
        element: (<PrivateRoute><Reports></Reports></PrivateRoute>),
      },
      {
        path: "/my-profile",
        element: (<PrivateRoute><MyProfile></MyProfile></PrivateRoute>),
      },
      {
        path: "/update-profile",
        element: (<PrivateRoute><UpdateProfile></UpdateProfile></PrivateRoute>),
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
]);
