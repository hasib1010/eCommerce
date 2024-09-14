import React, { useState } from 'react';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { IoLanguageSharp } from 'react-icons/io5';
import { LuShoppingCart } from 'react-icons/lu';
import { RxAvatar } from 'react-icons/rx';
import { Link, NavLink } from 'react-router-dom';
import Cart from './Components/Cart'; 
import { useCart } from './Components/Providers/CartProvider';

const NavBar = () => {
    const [searchBar, setSearchBar] = useState(true);
    const [isCartOpen, setIsCartOpen] = useState(false); // State for cart visibility
    const { state } = useCart(); // Access cart state

    const handleSearch = () => {
        setSearchBar(false);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className='shadow-lg sticky top-0 z-50 bg-white w-full'>
            <div className='container mx-auto'>
                {searchBar ? (
                    <div className='flex justify-between h-20 items-center'>
                        <div className='flex-1 flex gap-14'>
                            <NavLink to={'/shirt'} className='text-2xl font-semibold'>Shirt</NavLink>
                            <NavLink to={'/t-shirt'} className='text-2xl font-semibold'>T-Shirt</NavLink>
                            <NavLink to={'/hoodies'} className='text-2xl font-semibold'>Hoodies</NavLink>
                            <NavLink to={'/jackets'} className='text-2xl font-semibold'>Jackets</NavLink>
                        </div>
                        <div className='flex-1 flex items-center justify-center'>
                            <Link to={'/'}><img className='h-16' src="https://fabyoh.com/_next/image?url=https%3A%2F%2Fapi.fabyoh.com%2Flogos%2Fconverted-994938f9-7af3-4b40-97a1-dfe59593f836.webp&w=1920&q=75" alt="Logo" /></Link>
                        </div>
                        <div className='flex-1 flex justify-end items-center gap-14'>
                            <IoMdSearch onClick={handleSearch} className='text-4xl font-semibold cursor-pointer' />
                            <IoLanguageSharp className='text-4xl font-semibold' />
                            <RxAvatar className='text-4xl font-semibold' />
                            <div className='relative'>
                                <LuShoppingCart
                                    onClick={toggleCart}
                                    className='text-4xl font-semibold cursor-pointer'
                                />
                                {cartItemCount > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full'>
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='h-20 w-full'>
                        <div className="flex items-center px-5 rounded-lg border w-fit justify-center gap-3 mt-3 mx-auto">
                            <input
                                placeholder='What are you looking for....'
                                className='w-[700px] h-14 focus:outline-none'
                                type="text"
                            />
                            <button onClick={() => setSearchBar(true)}>
                                <IoMdClose className='text-4xl' />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Cart Overlay */}
            {isCartOpen && <Cart isOpen={isCartOpen} onClose={closeCart} />}
        </div>
    );
};

export default NavBar;
