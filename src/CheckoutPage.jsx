import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51PypvVKj6EpE0ZfrXAJfky3r5Y5ugbjJTVgJZXHv8gMkImcZFQWrXZMNhSOZdtL6Bux4CnVYbvWwoer8Ol0AW6G100t2eYWhWC");

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { items, total } = location.state || { items: [], total: 0 };

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            try {
                const response = await fetch('http://localhost:3000/create-checkout-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items, total }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setSessionId(data.sessionId);
            } catch (error) {
                console.error('Failed to fetch session:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCheckoutSession();
    }, [items, total]);

    const handleCheckout = async () => {
        if (!stripePromise || !sessionId) {
            return;
        }

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });

        if (error) {
            setError(error.message);
        }
    };

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {sessionId && !loading && !error ? (
                <div className="text-center">
                    <button
                        onClick={handleCheckout}
                        className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Pay Now
                    </button>
                </div>
            ) : (
                <div>No payment information available</div>
            )}
        </>
    );
};

export default CheckoutPage;
