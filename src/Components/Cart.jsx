import React, { useEffect } from 'react';
import { useCart } from './Providers/CartProvider';
import { Link, useNavigate } from 'react-router-dom';

const Cart = ({ isOpen, onClose }) => {
    const { state, dispatch } = useCart();
    const navigate = useNavigate();

    const handleIncreaseQuantity = (item) => {
        dispatch({ type: 'INCREASE_QUANTITY', payload: item });
    };

    const handleDecreaseQuantity = (item) => {
        dispatch({ type: 'DECREASE_QUANTITY', payload: item });
    };

    const handleRemoveItem = (item) => {
        const itemToRemove = {
            id: item.id,
            size: item.size,
            color: item.color,
        };
        dispatch({ type: 'REMOVE_ITEM', payload: itemToRemove });
    };

    const handleClearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const handleCheckout = () => {
        localStorage.setItem('hasStartedPaymentSession', 'true');
        onClose();
        navigate('/checkout', { state: { items: state.items, total: calculateTotalPrice() } });
    };

    if (!isOpen) return null;

    const calculateTotalPrice = () => {
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="fixed top-0 right-0 lg:w-1/4 md:w-1/3 bg-white text-black shadow-2xl h-full z-40 transition-transform transform-gpu" style={{ translate: isOpen ? '0' : '100%' }}>
            <button onClick={onClose} className="absolute top-4 right-4 text-3xl font-bold text-gray-500 hover:text-red-500 transition">×</button>
            <div className='p-6 flex flex-col h-full'>
                <h2 className='text-3xl font-bold mb-6 text-center'>🛒 Shopping Cart</h2>
                <div className="flex-1 overflow-y-auto" style={{ maxHeight: '75%' }}> {/* Allow scrolling */}
                    {state.items.length === 0 ? (
                        <div className='flex flex-col items-center justify-center h-full'>
                            <p className='text-lg text-gray-600 mb-4'>Your cart is empty!</p>
                            <img src="https://fabyoh.com/_next/image?url=%2Fassets%2FemptyCart.webp&w=128&q=75" alt="Empty Cart" className="w-32 h-32 mb-4" />
                            <Link onClick={onClose} to={'/AllProducts'} className='bg-blue-600 text-white text-lg px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition'>Shop Now</Link>
                        </div>
                    ) : (
                        <ul className='space-y-4'>
                            {state.items.map(item => (
                                <li key={`${item.id}-${item.size}-${item.color}`} className='border border-gray-200 shadow-lg p-4 rounded-lg flex flex-col items-center gap-4 bg-gray-50'>
                                    <img src={item.thumbnailImage} alt={item.name} className='w-24 h-24 object-cover rounded shadow' />
                                    <div className='flex-1'>
                                        <h3 className='text-lg font-semibold'>{item.name}</h3>
                                        <div className="flex items-center gap-5 text-sm text-gray-600">
                                            <p>Size: {item.size}</p>
                                            <p>Color: {item.color}</p>
                                        </div>
                                        <p className='text-lg font-bold text-blue-600'>${parseFloat(item.price).toFixed(2)}</p>
                                        <div className='flex items-center gap-2 mt-2'>
                                            <button onClick={() => handleDecreaseQuantity(item)} className='bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition'>-</button>
                                            <span className='text-lg font-bold'>{item.quantity}</span>
                                            <button onClick={() => handleIncreaseQuantity(item)} className='bg-gray-300 px-3 py-1 rounded hover:bg-gray-400 transition'>+</button>
                                            <button onClick={() => handleRemoveItem(item)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition'>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {state.items.length > 0 && (
                    <div className='mt-6 text-xl font-bold'>
                        <div className='flex justify-between'>
                            <span>Total:</span>
                            <span>${calculateTotalPrice().toFixed(2)}</span>
                        </div>
                        <div className='mt-4 flex gap-4'>
                            <button onClick={handleClearCart} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition'>Clear Cart</button>
                            <button onClick={handleCheckout} className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition'>Checkout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
    
    
};

export default Cart;
