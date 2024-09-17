import React, { useState, useRef, useEffect, useContext } from 'react';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { IoLanguageSharp } from 'react-icons/io5';
import { LuShoppingCart } from 'react-icons/lu';
import { RxAvatar } from 'react-icons/rx';
import { Link, NavLink } from 'react-router-dom';
import Cart from './Components/Cart';
import { useCart } from './Components/Providers/CartProvider';
import { AuthContext } from './Components/Providers/AuthProvider';

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [searchBar, setSearchBar] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { state } = useCart();
    const cartRef = useRef(null);

    const handleSearch = () => {
        setSearchBar(true);
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                closeCart();
            }
        };

        if (isCartOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCartOpen]);

    return (
        <div className='shadow-lg sticky top-0 z-50 bg-gradient-to-r min-h-[105px] from-blue-400 via-indigo-500 to-purple-600 text-white'>
            <div className='container mx-auto px-4 py-5 relative'>
                {/* Main Content */}
                {
                    !searchBar ?
                        (

                            <div className='flex justify-between items-center'>
                                <div className='flex-1 flex gap-8'>
                                    <NavLink to={'/shirt'} className='text-xl font-semibold hover:text-yellow-300 transition-colors'>Shirt</NavLink>
                                    <NavLink to={'/t-shirt'} className='text-xl font-semibold hover:text-yellow-300 transition-colors'>T-Shirt</NavLink>
                                    <NavLink to={'/hoodies'} className='text-xl font-semibold hover:text-yellow-300 transition-colors'>Hoodies</NavLink>
                                    <NavLink to={'/jackets'} className='text-xl font-semibold hover:text-yellow-300 transition-colors'>Jackets</NavLink>
                                </div>
                                <div className='flex-1 flex items-center justify-center'>
                                    <Link to={'/'}>
                                        <img className='h-16' src="/logo.png" alt="Logo" />
                                    </Link>
                                </div>
                                <div className='flex-1 flex justify-end items-center gap-8'>
                                    <IoMdSearch onClick={handleSearch} className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors' />
                                    <IoLanguageSharp className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors' />
                                    {user ? (
                                        <div className='flex items-center gap-2'>
                                            <Link to={"/userDashboard"}>
                                                <img className='h-8 w-8 rounded-full border-2 border-white' src={user.photoURL ? user.photoURL : "https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt="User Avatar" />
                                            </Link>
                                            <div className='flex flex-col items-center text-sm'>
                                                <p className='text-white'>{user.displayName}</p>
                                                <button onClick={() => logOut()} className='mt-1 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition-colors text-xs'>Sign Out</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={"/userDashboard"}>
                                            <RxAvatar className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors' />
                                        </Link>
                                    )}
                                    <div className='relative'>
                                        <LuShoppingCart
                                            onClick={toggleCart}
                                            className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors'
                                        />
                                        {cartItemCount > 0 && (
                                            <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full'>
                                                {cartItemCount}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>)
                        :
                        (
                            <div className='flex items-center justify-center h-full w-full'>
                                <div className={` w-fit flex  items-center justify-center    rounded-lg border border-white bg-white min-w-96  mx-auto`}>
                                    <input
                                        placeholder='What are you looking for....'
                                        className=' w-96  px-4 py-2 focus:outline-none'
                                        type="text"
                                    />
                                    <button onClick={() => setSearchBar(false)} className='ml-2'>
                                        <IoMdClose className='text-3xl text-gray-600 hover:text-gray-800 transition-colors' />
                                    </button>
                                </div>
                            </div>
                        )
                }


            </div>

            {isCartOpen && (
                <div ref={cartRef} className='absolute right-0 top-20 bg-white shadow-lg rounded-lg'>
                    <Cart isOpen={isCartOpen} onClose={closeCart} />
                </div>
            )}
        </div>
    );
};

export default NavBar;
