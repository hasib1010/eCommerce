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
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx';

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
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute
            element={<CheckoutPage />} 
          />
        ),
      },
      {
        path: "/cancel",
        element: (
          <ProtectedRoute 
            element={<Cancel />} 
          />
        ),
      },
      {
        path: "/success",
        element: (
          <ProtectedRoute 
            element={<Success />} 
          />
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </CartProvider>
);
