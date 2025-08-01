import Category from "@pages/Category";
import Customer from "@pages/Customer";
import Dashboard from "@pages/Dashboard";
import Login from "@pages/login";
import NotFound from "@pages/NotFound";
import Order from "@pages/Order";
import Product from "@pages/Product";
import Purchase from "@pages/Purchase";
import Supplier from "@pages/Supplier";
import { createBrowserRouter, Navigate } from "react-router";
import Layout from "./layout";
import ProtectedRoute from "@components/routing/ProtectedRoute";
import PublicRoute from "@components/routing/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Navigate to="/product" replace />,
          },
          {
            path: "/category",
            element: <Category />,
          },
          {
            path: "/product",
            element: <Product />,
          },
          {
            path: "/order",
            element: <Order />,
          },
          {
            path: "/customer",
            element: <Customer />,
          },
          {
            path: "/purchase",
            element: <Purchase />,
          },
          {
            path: "/supplier",
            element: <Supplier />,
          },
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <PublicRoute />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
]);
