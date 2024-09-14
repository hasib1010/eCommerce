import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Providers/CartProvider';

const Success = () => {
    const { clearCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        // Clear the cart when the component mounts
        clearCart();
        // Redirect to the home page after clearing the cart
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000); // Redirect after 3 seconds

        // Cleanup timer if component unmounts
        return () => clearTimeout(timer);
    }, [clearCart, navigate]);

    return (
        <div className="min-h-screen bg-green-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful</h1>
                <p className="text-gray-600 mb-6">
                    Thank you for your purchase! Your payment has been processed successfully.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <p className="font-semibold text-gray-700">Order Number: <span className="text-gray-900">#123456789</span></p>
                    <p className="font-semibold text-gray-700">Estimated Delivery: <span className="text-gray-900">Sep 20, 2024</span></p>
                </div>

                <div className="flex justify-center space-x-4 mb-6">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                        onClick={() => navigate('/order-summary')} // Adjust route if needed
                    >
                        View Order
                    </button>
                    <button
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
                        onClick={() => navigate('/')}
                    >
                        Return Home
                    </button>
                </div>

                <div className="mt-4">
                    <p className="text-gray-500">
                        Need help? <a href="/support" className="text-blue-500 underline">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Success;
