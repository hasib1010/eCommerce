import React, { useContext, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { AuthContext } from './Components/Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useCart } from './Components/Providers/CartProvider';

const CheckoutForm = ({ items, total, clientSecret }) => {  
  const { dispatch } = useCart();
  const { user } = useContext(AuthContext);
  const [shippingAddress, setShippingAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe.js has not loaded yet.');
      return;
    }

    if (!shippingAddress || !contactNumber) {
      setError('Please enter shipping address and contact number.');
      return;
    }

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            address: {
              line1: shippingAddress,
            },
            phone: contactNumber,
          },
        },
      });

      if (stripeError) {
        setError(`Payment failed: ${stripeError.message}`);
        return;
      }

      if (paymentIntent.status !== 'succeeded') {
        setError('Payment did not succeed.');
        return;
      }

      const orderData = {
        uid: user.uid,
        items, 
        transactionId: paymentIntent.id,
        shippingAddress,
        phoneNumber: contactNumber,
        total,
        confirmedAt: new Date().toISOString(),  
      };
      
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to post order');
      }

      Swal.fire({
        title: 'Success!',
        text: 'Your order has been placed successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/userDashboard');
        dispatch({ type: 'CLEAR_CART' });
      });

    } catch (error) {
      setError(`An error occurred: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Review Your Order</h2>

      {items.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4 mb-6">
            {items.map((item) => (
              <li key={`${item.id}-${item.size}-${item.color}`} className="border border-gray-200 p-4 rounded-lg flex items-center gap-4 bg-gray-50 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img src={item.thumbnailImage} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">Size: {item.size}</p>
                  <p className="text-gray-600">Color: {item.color}</p>
                  <p className="text-lg font-bold text-gray-800">${parseFloat(item.price).toFixed(2)}</p>
                  <p className="text-lg font-bold text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-xl font-bold mb-6 text-gray-800 text-right">
            Total: <span className="text-blue-600">${total.toFixed(2)}</span>
          </div>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Shipping Address</label>
        <input
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
          placeholder="Enter your shipping address"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Contact Number</label>
        <input
          type="text"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Enter your contact number"
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Payment Information</label>
        <CardElement className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
