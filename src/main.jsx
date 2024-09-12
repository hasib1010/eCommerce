import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Layout from './layout.jsx';
import ProductDetails from './Components/Products/ProductsDetails.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element:  <App></App>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>  ,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)
