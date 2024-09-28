import React, { useState, useRef, useEffect, useContext } from 'react';
import { IoMdClose, IoMdSearch } from 'react-icons/io';
import { IoLanguageSharp } from 'react-icons/io5';
import { LuShoppingCart } from 'react-icons/lu';
import { Link, NavLink } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import Cart from './Components/Cart';
import { useCart } from './Components/Providers/CartProvider';
import { AuthContext } from './Components/Providers/AuthProvider';
import { GoHomeFill } from "react-icons/go";
import { FaShopLock } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import NavbarMenu from './NavbarMenu';

const NavBar = () => {
    const [categories, setCategories] = useState([]);
    const [openCategories, setOpenCategories] = useState([]);
    const { user, logOut } = useContext(AuthContext);
    const [searchBar, setSearchBar] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { state } = useCart();
    
    const cartRef = useRef(null);
    const dropdownRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:3000/products/clothings/categories");
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                setCategories(data.categories.slice(0, 3));
                setOpenCategories(data.categories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleSearch = () => {
        setSearchBar(true);
        closeMenu();
    };

    const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target) && isCartOpen) {
                closeCart();
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isDropdownOpen) {
                setIsDropdownOpen(false);
            }
            if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCartOpen, isDropdownOpen, isMenuOpen]);

    const handleAvatarClick = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleDropdownOptionClick = () => {
        setIsDropdownOpen(false);
    };

    // Simulated product data for demonstration
    const products = [
        { id: 1, name: "T-Shirt" },
        { id: 2, name: "Jeans" },
        { id: 3, name: "Jacket" },
        { id: 4, name: "Sneakers" },
        // Add more products as needed
    ];

    // Handle search input changes
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter products based on the search term
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        // Navigate to search results page or display filtered products
        console.log('Search results:', filteredProducts);
        // Reset search term after submit if needed
        setSearchTerm('');
    };

    return (
        <div className='shadow-lg lg:sticky top-0 z-40 bg-gradient-to-r from-blue-500 to-purple-600 text-white'>
            {/* Footer Navbar for Small Devices */}
            <div className='fixed bottom-0 left-0 right-0 mt-28 bg-white shadow-lg h-fit lg:hidden z-40'>
                <div className='flex items-center pt-3 justify-around p-2'>
                    <Link to="/" className='text-center text-black'>
                        <GoHomeFill className='text-3xl' />
                        <p className='text-xs'>Home</p>
                    </Link>
                    <Link to="/AllProducts" className='text-center text-black'>
                        <FaShopLock className='text-3xl' />
                        <p className='text-xs'>Shop</p>
                    </Link>
                    <Link to="/userDashboard" className='text-center text-black'>
                        <CgProfile className='text-3xl' />
                        <p className='text-xs'>Profile</p>
                    </Link>
                    <div className='relative mt-2 lg:hidden flex flex-col items-center'>
                        <LuShoppingCart onClick={toggleCart} className='text-3xl text-black' />
                        <p className='text-xs text-black'>Cart</p>
                        {cartItemCount > 0 && (
                            <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs max-h-7 min-w-6 text-center rounded-full'>
                                {cartItemCount}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className='container mx-auto px-4 py-4 flex md:flex-row items-center justify-between'>
                {/* Hamburger Menu */}
                <div className='flex lg:hidden'>
                    <HiMenu onClick={toggleMenu} className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors' />
                </div>

                {/* Categories */}
                <div className='flex-1 gap-4 justify-center md:justify-start hidden lg:flex'>
                    <NavLink className={"text-lg font-semibold hover:text-yellow-300 transition-colors"} to={"/AllProducts"}>All Products</NavLink>
                    {categories.map((item, index) => (
                        <NavLink key={index} to={`/navbar/${item}`} className='text-lg font-semibold hover:text-yellow-300 transition-colors'>
                            {item}
                        </NavLink>
                    ))}
                    <NavbarMenu openCategories={openCategories} />
                </div>

                {/* Logo */}
                <div className='flex-1 flex items-center justify-center md:justify-center'>
                    <Link to={'/'}>
                        <img className='h-16' src="https://fabyoh.com/_next/image?url=https%3A%2F%2Fapi.fabyoh.com%2Flogos%2Fconverted-c274775b-8cda-4b47-af41-342385184758.webp&w=1920&q=75" alt="Logo" />
                    </Link>
                </div>

                {/* Cart and Search Icons */}
                <div className='relative mt-2 lg:hidden flex items-center gap-4'>
                    <IoMdSearch onClick={toggleSearch} className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors' />
                    <LuShoppingCart onClick={toggleCart} className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors' />
                    {cartItemCount > 0 && (
                        <span className='absolute -top-2 -right-2 bg-red-600 text-white text-xs max-h-7 min-w-6 text-center rounded-full'>
                            {cartItemCount}
                        </span>
                    )}
                </div>

                {/* User Options */}
                <div className='flex-1 items-center justify-end gap-4 hidden lg:flex'>
                    <IoMdSearch onClick={toggleSearch} className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors' />
                    <IoLanguageSharp className='text-3xl cursor-pointer hover:text-yellow-300 transition-colors' />
                    {user ? (
                        <div className='relative flex items-center gap-2 dropdown' ref={dropdownRef}>
                            <div onClick={handleAvatarClick}>
                                <img className='h-8 w-8 rounded-full border-2 border-white' src={user.photoURL || "https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt="User Avatar" />
                            </div>
                            {isDropdownOpen && (
                                <div className='absolute -right-16 top-8 mt-2 bg-white text-black rounded shadow-lg z-50 p-2'>
                                    <Link to="/userDashboard" className='block py-1 hover:bg-gray-200' onClick={handleDropdownOptionClick}>Profile</Link>
                                    <button onClick={() => { logOut(); handleDropdownOptionClick(); }} className='block w-full text-left py-1 text-red-600 hover:bg-gray-200'>Sign Out</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to={"/login"} className='text-white text-lg hover:text-yellow-300'>Log In</Link>
                    )}
                    <div className='relative' ref={cartRef}>
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
                <div ref={menuRef} className='fixed inset-0 bg-white text-black z-40 flex flex-col p-4'>
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
                        <IoLanguageSharp className='text-2xl cursor-pointer hover:text-yellow-300 transition-colors' />
                        {user ? (
                            <div className='flex items-center gap-2 mt-2'>
                                <Link to={'/userDashboard'} onClick={closeMenu}>
                                    <img className='h-8 w-8 rounded-full border-2 border-black' src={user.photoURL || "https://static.vecteezy.com/system/resources/thumbnails/036/280/651/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"} alt="User Avatar" />
                                </Link>
                                <div className='flex flex-col items-center text-sm'>
                                    <p className='text-black'>{user.displayName}</p>
                                    <Link to="/userDashboard" className='bg-blue-500 text-black py-1 px-2 rounded-md hover:bg-blue-600 transition-colors text-xs'>Dashboard</Link>
                                    <button onClick={() => { logOut(); closeMenu(); }} className='mt-1 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition-colors text-xs'>Sign Out</button>
                                </div>
                            </div>
                        ) : (
                            <Link onClick={closeMenu} to={"/login"} className='text-black text-lg hover:text-yellow-300 mt-2'>Log In</Link>
                        )}
                    </div>
                </div>
            )}

            {/* Search Bar */}
            {searchBar && (
                <div className='flex items-center justify-center w-full bg-white p-2'>
                    <form onSubmit={handleSearchSubmit} className='flex items-center w-full max-w-md'>
                        <input
                            placeholder='What are you looking for...'
                            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button type='submit' className='ml-2'>
                            <IoMdSearch className='text-3xl text-gray-600 hover:text-gray-800 transition-colors' />
                        </button>
                        <button onClick={() => setSearchBar(false)} className='ml-2'>
                            <IoMdClose className='text-3xl text-gray-600 hover:text-gray-800 transition-colors' />
                        </button>
                    </form>
                    {/* Display filtered products */}
                    <div>
                        {filteredProducts.length > 0 && (
                            <div className="absolute bg-white text-black shadow-lg mt-2 rounded-lg z-50">
                                {filteredProducts.map(product => (
                                    <div key={product.id} className="p-2 border-b last:border-b-0 hover:bg-gray-200 cursor-pointer">
                                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Cart Component */}
            {isCartOpen && (
                <div ref={cartRef} className='fixed top-0 right-0 bg-white shadow-lg rounded-lg z-40 h-full w-1/4 overflow-y-auto'>
                    <Cart onClose={closeCart} />
                </div>
            )}
        </div>
    );
};

export default NavBar;
