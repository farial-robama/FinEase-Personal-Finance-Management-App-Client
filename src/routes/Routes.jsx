import { createBrowserRouter, Outlet } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddTransaction from "../pages/Dashboard/Transactions/AddTransaction";
import MyTransactions from "../pages/Dashboard/Transactions/MyTransactions";
import TransactionDetails from "../pages/Dashboard/Transactions/TransactionDetails";
import UpdateTransaction from "../pages/Dashboard/Transactions/UpdateTransaction";
import Reports from "../pages/Dashboard/Reports/Reports";
import MyProfile from "../pages/Profile/MyProfile";
import UpdateProfile from "../pages/Profile/UpdateProfile";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../pages/ErrorPage/NotFound";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Public Routes
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },

      // 404 Not Found
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  // Dashboard Routes - Separate Layout
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Dashboard Home
      {
        index: true,
        element: <Dashboard />,
      },

      // Transaction Routes
      {
        path: "transactions/add",
        element: <AddTransaction />,
      },
      {
        path: "transactions/my",
        element: <MyTransactions />,
      },
      {
        path: "transactions/details/:id",
        element: <TransactionDetails />,
      },
      {
        path: "transactions/update/:id",
        element: <UpdateTransaction />,
      },

      // Reports Route
      {
        path: "reports",
        element: <Reports />,
      },

      // Profile Routes
      {
        path: "profile",
        element: <MyProfile />,
      },
  
      {
        path: "profile/update",
        element: <UpdateProfile />,
      },
    ],
  },
]);