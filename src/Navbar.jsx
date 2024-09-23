import React, { useState, useRef, useEffect, useContext } from 'react';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { IoLanguageSharp } from 'react-icons/io5';
import { LuShoppingCart } from 'react-icons/lu';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import Cart from './Components/Cart';
import { useCart } from './Components/Providers/CartProvider';
import { AuthContext } from './Components/Providers/AuthProvider';

const NavBar = () => {
    const [categories, setCategories] = useState([]);
    const { user, logOut } = useContext(AuthContext);
    const [searchBar, setSearchBar] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { state } = useCart();
    const cartRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://e-commerce-server-alpha.vercel.app/products/clothings/categories");
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
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
        <div className='shadow-lg sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
            <div className='container mx-auto px-4 py-4 flex   md:flex-row items-center justify-between'>
                {/* Hamburger Menu */}
                <div className='flex lg:hidden'>
                    <HiMenu onClick={toggleMenu} className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors' />
                </div>

                {/* Categories */}
                <div className='flex-1 gap-4 justify-center md:justify-start hidden lg:flex'>
                    <NavLink className={"text-xl font-semibold hover:text-yellow-300 transition-colors"} to={"/AllProducts"}>All Products</NavLink>
                    {categories.map((item, index) => (
                        <NavLink key={index} to={`/navbar/${item}`} className='text-xl font-semibold hover:text-yellow-300 transition-colors'>
                            {item}
                        </NavLink>
                    ))}
                </div>

                {/* Logo */}
                <div className='flex-1 flex items-center justify-center md:justify-center'>
                    <Link to={'/'}>
                        <img className='h-16' src="https://fabyoh.com/_next/image?url=https%3A%2F%2Fapi.fabyoh.com%2Flogos%2Fconverted-c274775b-8cda-4b47-af41-342385184758.webp&w=1920&q=75" alt="Logo" />
                    </Link>
                </div>

                {/* Search and User Options */}
                <div className='flex-1 items-center justify-end gap-4 hidden lg:flex'>
                    <IoMdSearch onClick={() => setSearchBar(true)} className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors' />
                    <IoLanguageSharp className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors' />
                    {user ? (
                        <div className='flex items-center gap-2'>
                            <Link to={"/userDashboard"}>
                                <img className='h-8 w-8 rounded-full border-2 border-white' src={user.photoURL || "https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt="User Avatar" />
                            </Link>
                            <div className='flex flex-col items-center text-sm'>
                                <p className='text-white'>{user.displayName}</p>
                                <button onClick={logOut} className='mt-1 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition-colors text-xs'>Sign Out</button>
                            </div>
                        </div>
                    ) : (
                        <Link to={"/login"} className='text-white text-lg hover:text-yellow-300'>Log In</Link>
                    )}
                    <div className='relative'>
                        <LuShoppingCart onClick={toggleCart} className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors' />
                        {cartItemCount > 0 && (
                            <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full'>
                                {cartItemCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className='fixed inset-0 bg-white text-black z-50 flex flex-col p-4'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-2xl font-bold'>Menu</h2>
                        <button onClick={closeMenu}>
                            <IoMdClose className='text-3xl hover:text-gray-600' />
                        </button>
                    </div>
                    <div className='flex flex-col mt-4'>
                        <NavLink to={"/AllProducts"} className='py-2 text-lg font-semibold' onClick={closeMenu}>All Products</NavLink>
                        {categories.map((item, index) => (
                            <NavLink key={index} to={`/navbar/${item}`} className='py-2 text-lg font-semibold' onClick={closeMenu}>
                                {item}
                            </NavLink>
                        ))}
                    </div>

                    {/* Search and User Options in Mobile Menu */}
                    <div className='mt-4'>
                        <div className='flex items-center justify-between'>
                            <IoMdSearch onClick={() => setSearchBar(true)} className='text-2xl cursor-pointer hover:text-yellow-300 transition-colors' />
                            <IoLanguageSharp className='text-2xl cursor-pointer hover:text-yellow-300 transition-colors' />
                        </div>
                        {user ? (
                            <div className='flex items-center gap-2 mt-2'>
                                <Link to={"/userDashboard"}>
                                    <img className='h-8 w-8 rounded-full border-2 border-black' src={user.photoURL || "https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt="User Avatar" />
                                </Link>
                                <div className='flex flex-col items-center text-sm'>
                                    <p className='text-black'>{user.displayName}</p>
                                    <button onClick={logOut} className='mt-1 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition-colors text-xs'>Sign Out</button>
                                </div>
                            </div>
                        ) : (
                            <Link to={"/login"} className='text-black text-lg hover:text-yellow-300 mt-2'>Log In</Link>
                        )}
                        <div className='relative mt-2'>
                            <LuShoppingCart onClick={toggleCart} className='text-2xl cursor-pointer hover:text-yellow-300 transition-colors' />
                            {cartItemCount > 0 && (
                                <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full'>
                                    {cartItemCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Search Bar */}
            {searchBar && (
                <div className='flex items-center justify-center w-full bg-white p-2'>
                    <div className='flex items-center w-full max-w-md'>
                        <input
                            placeholder='What are you looking for...'
                            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type="text"
                        />
                        <button onClick={() => setSearchBar(false)} className='ml-2'>
                            <IoMdClose className='text-3xl text-gray-600 hover:text-gray-800 transition-colors' />
                        </button>
                    </div>
                </div>
            )}

            {/* Cart Component */}
            {isCartOpen && (
                <div ref={cartRef} className='absolute right-0 top-20 bg-white shadow-lg rounded-lg'>
                    <Cart isOpen={isCartOpen} onClose={closeCart} />
                </div>
            )}
        </div>
    );
};

export default NavBar;
