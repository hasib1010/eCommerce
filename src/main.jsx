import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Layout from './layout.jsx';
import ProductDetails from './Components/Products/ProductsDetails.jsx';
import { CartProvider } from './Components/Providers/CartProvider.jsx';
import CheckoutPage from './CheckoutPage.jsx';
import Cancel from './Components/Payments/Cancel.jsx';
import Success from './Components/Payments/Success.jsx';
import AuthProvider from './Components/Providers/AuthProvider.jsx';
import LogIn from './Components/Credentials/Login.jsx';
import Registration from './Components/Credentials/Registration.jsx';
import PrivateRoutes from './Components/PrivateRoute/PrivateRoute.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductCatalog from './Components/ProductCatalog/ProductCatalog.jsx';
import UserDashboard from "./Components/Credentials/UserDashboard.jsx"
import AllProducts from './Components/ProductCatalog/AllProducts.jsx';
import OrderDetails from './Components/Hooks/OrderDetails.jsx';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/AllProducts",
        element: <AllProducts></AllProducts>,
      },
      {
        path: "/navbar/:cat",
        element: <ProductCatalog />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path:"/orders/:transactionId",
        element:< OrderDetails />
      },
  {
    path: "/checkout",
    element:
      <PrivateRoutes>
        <CheckoutPage></CheckoutPage>
      </PrivateRoutes>
  },
  {
    path: "/userDashboard",
    element:
      <PrivateRoutes>
        <UserDashboard>
        </UserDashboard>
      </PrivateRoutes>
  },
  {
    path: "/cancel",
    element:
      <PrivateRoutes>
        <Cancel />
      </PrivateRoutes>

  },
  {
    path: "/success",
    element: <PrivateRoutes>  <Success /> </PrivateRoutes>
  },
],
  },
]);

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);
