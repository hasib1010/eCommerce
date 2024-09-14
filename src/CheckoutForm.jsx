import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ items, total }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setLoading(true);

        try {
            const response = await fetch('https://e-commerce-server-alpha.vercel.app/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { url } = await response.json();
            window.location.href = url; // Redirect to Stripe Checkout
        } catch (error) {
            console.error('Error redirecting to checkout:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* <CardElement className="my-4 p-2 border rounded" /> */}
            <button
                type="submit"
                disabled={!stripe || loading}
                className={`w-full h-20 text-white px-4 py-2 rounded mt-4 transition duration-300 ease-in-out 
        ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`
                }
            >
                {loading ? 'Processing...' : 'Pay Now'}
            </button>

        </form>
    );
};

export default CheckoutForm;
