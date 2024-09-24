import React from 'react';
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
        dispatch({ type: 'REMOVE_ITEM', payload: item });
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
        <div className="fixed top-0 right-0 w-full md:w-1/3 bg-white text-black shadow-lg   h-full overflow-y-auto z-40">
            <button onClick={onClose} className="absolute top-4 right-4 text-5xl font-bold">&times;</button>
            <div className='p-6'>
                <h2 className='text-3xl font-bold mb-6'>Shopping Cart</h2>
                {state.items.length === 0 ? (
                    <div className='flex  flex-col items-center justify-center h-screen'>
                        <p>There is nothing in your bag!</p>
                        <img src="https://fabyoh.com/_next/image?url=%2Fassets%2FemptyCart.webp&w=128&q=75" alt="" />
                        <Link onClick={onClose} to={'/AllProducts'} className='w-fit bg-gray-700 text-white text-center text-5xl p-5 rounded-3xl  '>Shop Now</Link>
                    </div>
                ) : (
                    <div>
                        <ul className='space-y-4'>
                            {state.items.map(item => (
                                <li key={`${item.id}-${item.size}-${item.color}`} className='border p-4 rounded-lg flex items-center gap-4'>
                                    <img src={item.thumbnailImage} alt={item.name} className='w-24 h-24 object-cover rounded' />
                                    <div className='flex-1'>
                                        <h3 className='text-xl font-semibold'>{item.name}</h3>
                                        <p className='text-gray-600'>Size: {item.size}</p>
                                        <p className='text-gray-600'>Color: {item.color}</p>
                                        <p className='text-lg font-bold'>${parseFloat(item.price).toFixed(2)}</p>
                                        <div className='flex items-center gap-2 mt-2'>
                                            <button onClick={() => handleDecreaseQuantity(item)} className='bg-gray-300 px-4 py-2 rounded'>-</button>
                                            <span className='text-lg font-bold'>{item.quantity}</span>
                                            <button onClick={() => handleIncreaseQuantity(item)} className='bg-gray-300 px-4 py-2 rounded'>+</button>
                                            <button onClick={() => handleRemoveItem(item)} className='bg-red-500 text-white px-4 py-2 rounded'>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className='mt-6 text-xl font-bold'>
                            Total: ${calculateTotalPrice().toFixed(2)}
                        </div>
                        <div className='mt-6 flex gap-4'>
                            <button onClick={handleClearCart} className='bg-red-500 text-white px-4 py-2 rounded'>
                                Clear Cart
                            </button>
                            <button onClick={handleCheckout} className='bg-green-500 text-white px-4 py-2 rounded'>
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
