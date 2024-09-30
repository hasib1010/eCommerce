// SuccessPage.jsx

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const searchParams = new URLSearchParams(location.search);
      const sessionId = searchParams.get('session_id'); // Extract session_id from URL

      if (!sessionId) {
        setError('Session ID is missing');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://e-commerce-server-alpha.vercel.app/order/${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [location.search]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Confirmation</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className='border p-4 rounded-lg mb-4'>
          <h3 className='text-lg font-semibold'>Customer Information</h3>
          <p><strong>Name:</strong> {orderDetails.customerName}</p>
          <p><strong>Email:</strong> {orderDetails.customerEmail}</p>
          <p><strong>Shipping Address:</strong></p>
          <p>{orderDetails.shippingAddress.name}</p>
          <p>{orderDetails.shippingAddress.address.line1} {orderDetails.shippingAddress.address.line2}</p>
          <p>{orderDetails.shippingAddress.address.city}, {orderDetails.shippingAddress.address.state} {orderDetails.shippingAddress.address.postal_code}</p>
          <p>{orderDetails.shippingAddress.address.country}</p>
        </div>
        <h3 className='text-lg font-semibold mb-2'>Order Details</h3>
        <ul className='space-y-4'>
          {orderDetails.products.map((item, index) => (
            <li key={index} className='border p-4 rounded-lg'>
              <h4 className='text-xl font-semibold'>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.amount.toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <div className='mt-6 text-xl font-bold'>
          <p>Total Amount: ${orderDetails.amount.toFixed(2)}</p>
          <p>Order Number: {orderDetails.orderNumber}</p>
          <p>Estimated Delivery: {orderDetails.estimatedDelivery}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
