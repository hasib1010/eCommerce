import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
 
const stripePromise = loadStripe("pk_test_51PypvVKj6EpE0ZfrXAJfky3r5Y5ugbjJTVgJZXHv8gMkImcZFQWrXZMNhSOZdtL6Bux4CnVYbvWwoer8Ol0AW6G100t2eYWhWC");

const CheckoutPage = () => {
    const location = useLocation();
    const { items, total } = location.state || { items: [], total: 0 };

    const [clientSecret, setClientSecret] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientSecret = async () => {
            try {
                const response = await fetch('https://e-commerce-server-alpha.vercel.app/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items, total })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setClientSecret(data.clientSecret);
            } catch (error) {
                console.error('Failed to fetch client secret:', error.message);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClientSecret();
    }, [items, total]);

    return (
        <>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {clientSecret && stripePromise ? (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutForm items={items} total={total} clientSecret={clientSecret} />
                </Elements>
            ) : (
                <div>No payment information available</div>
            )}
        </>
    );
};

export default CheckoutPage;
