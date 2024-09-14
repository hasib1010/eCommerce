import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm'; 
import { useCart } from './Components/Providers/CartProvider';

const stripePromise = loadStripe('pk_test_qblFNYngBkEdjEZ16jxxoWSM');

const CheckoutPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { clearCart } = useCart(); // Access clearCart function

    const { items, total } = location.state || { items: [], total: 0 };

    useEffect(() => {
        // Check if we are on the success page and clear the cart
        if (location.pathname === '/success') {
            clearCart(); // Clear the cart
        }
    }, [location.pathname, clearCart]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div>
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <ul className='space-y-4'>
                    {items.map(item => (
                        <li key={`${item.id}-${item.size}-${item.color}`} className='border p-4 rounded-lg flex items-center gap-4'>
                            <img src={item.thumbnailImage} alt={item.name} className='w-24 h-24 object-cover rounded' />
                            <div className='flex-1'>
                                <h3 className='text-xl font-semibold'>{item.name}</h3>
                                <p className='text-gray-600'>Size: {item.size}</p>
                                <p className='text-gray-600'>Color: {item.color}</p>
                                <p className='text-lg font-bold'>${parseFloat(item.price).toFixed(2)} x {item.quantity}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className='mt-6 text-xl font-bold'>
                    Total: ${total.toFixed(2)}
                </div>
            </div>
            <Elements stripe={stripePromise}>
                <CheckoutForm items={items} total={total} />
            </Elements>
        </div>
    );
};

export default CheckoutPage;
