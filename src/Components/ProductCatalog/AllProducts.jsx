import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMediaQuery } from '@mui/material';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { pink } from '@mui/material/colors';

import trendingIcon from "./../../assets/trending.gif"

const AllProducts = () => {
    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(12); // Default for large screens
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Detect if the screen size is small
    const isSmallScreen = useMediaQuery('(max-width: 1024px)');

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3000/products/clothings");
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setAllProducts(data.products);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:3000/products/clothings/categories");
                if (!res.ok) throw new Error('Network response was not ok');
                const data = await res.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const fetchUserWishlist = async () => {
        if (!user) return;

        try {
            const response = await fetch(`http://localhost:3000/users/${user.uid}`);
            if (response.ok) {
                const data = await response.json();
                setWishlist(data.wishList || []);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        }
    };

    useEffect(() => {
        fetchUserWishlist();
    }, [user]);

    const toggleWishlist = (productId) => {
        if (!user) {
            Swal.fire({ icon: 'warning', title: 'Have You Logged In?' });
            return;
        }

        setWishlist((prevWishlist) => {
            const newWishlist = prevWishlist.includes(productId)
                ? prevWishlist.filter(id => id !== productId)
                : [...prevWishlist, productId];
            updateWishlist(user.uid, newWishlist);
            return newWishlist;
        });
    };

    const updateWishlist = async (id, updatedWishlist) => {
        const dataToSubmit = { wishList: updatedWishlist };
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSubmit)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            Swal.fire({ title: 'Update Successful!', text: 'Your wishlist has been updated', icon: 'success' });
        } catch (error) {
            Swal.fire({ title: 'Error!', text: 'An error occurred while updating the wishlist', icon: 'error' });
        }
    };

    // Get current products for pagination
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Pagination component
    const Pagination = ({ totalProducts, productsPerPage }) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
            pageNumbers.push(i);
        }

        return (
            <nav className="flex justify-center mt-4">
                <ul className="flex space-x-2">
                    {pageNumbers.map(number => (
                        <li key={number}>
                            <button
                                onClick={() => paginate(number)}
                                className={`px-3 py-2 border rounded ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    };

    return (
        <div>
            <div className='h-80 flex flex-col border-b justify-end bg-[url("https://t3.ftcdn.net/jpg/06/36/44/26/360_F_636442646_II8z4yhYbPoea8P6HoimUblo6ZQXzUXY.jpg")]'>
                <div className='bg-white w-fit p-10 rounded-lg'>
                    <h3 className='text-4xl font-bold'>Shop</h3>
                    <p className='mt-1 text-xl'>
                        You don't need to approach fashion. <br /> Fashion approaches you here.
                    </p>
                </div>
            </div>
            <div>
                <div className='border-t'>
                    <div className='lg:min-w-[500px] w-full mr-10 px-4'>
                        <div className='border-b py-5 text-2xl flex justify-between items-center'>
                            {loading ? (
                                <Skeleton animation="wave" width={300} variant="text" sx={{ fontSize: '5rem' }} />
                            ) : (
                                <h4 className='font-semibold'>{`Total ${allProducts.length} Items Found`}</h4>
                            )}
                        </div>
                        <div className='flex flex-wrap lg:flex-nowrap mt-4'>
                            {/* Category Section */}
                            <div className='flex flex-col border bg-white rounded-lg shadow-md w-full lg:min-w-[450px] lg:w-[30%] p-4'>
                                <div className='border-b py-4'>
                                    <h4 className='text-2xl font-semibold cursor-pointer flex justify-between items-center'>
                                        Category
                                    </h4>

                                    {/* Display categories differently based on screen size */}
                                    {isSmallScreen ? (
                                        <>
                                            <IconButton onClick={handleMenuClick}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleMenuClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                {loading ? (
                                                    Array.from(new Array(9)).map((_, index) => (
                                                        <Skeleton key={index} animation="wave" width={300} variant="text" sx={{ fontSize: '3rem' }} />
                                                    ))
                                                ) : (
                                                    categories.map((item, index) => (
                                                        <MenuItem key={index} onClick={handleMenuClose}>
                                                            <Link to={`/navbar/${item}`}>
                                                                <h4 className='font-semibold text-2xl mt-3 text-slate-700 hover:bg-slate-100 hover:text-slate-900'>{item}</h4>
                                                            </Link>
                                                        </MenuItem>
                                                    ))
                                                )}
                                            </Menu>
                                        </>
                                    ) : (
                                        <>
                                            {loading ? (
                                                Array.from(new Array(9)).map((_, index) => (
                                                    <Skeleton key={index} animation="wave" width={300} variant="text" sx={{ fontSize: '3rem' }} />
                                                ))
                                            ) : (
                                                categories.map((item, index) => (
                                                    <Link key={index} to={`/navbar/${item}`}>
                                                        <h4 className='font-semibold text-2xl lg:mt-10 mt-3 border px-2 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900'>{item}</h4>
                                                    </Link>
                                                ))
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* Products Section */}
                            <div className='container mx-auto border-l p-10 bg-gray-50 rounded-lg shadow-md w-full lg:w-[70%]'>
                                <h2 className='text-xl font-semibold mb-4'>Products</h2>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6'>
                                    {(loading ? Array.from(new Array(9)) : currentProducts).map((item, index) => (
                                        <Box className="border relative rounded-md p-3 group" key={item ? item._id : index} sx={{ width: '100%', marginRight: 0.5, my: 5 }}>
                                            <div className='flex flex-col lg:gap-5'>
                                                {item ? (
                                                    <Link  to={`/product/${item._id}`}>
                                                        <div className='lg:min-h-96 relative'>
                                                            <img className='w-full absolute top-0 rounded-lg  group-hover:opacity-0 duration-300 ease-in-out' src={item.thumbnailImage} alt={item.name} />
                                                            <img className='w-full   rounded-lg  group-hover:opacity-100 duration-300 ease-in-out' src={item.hoverImageUrl} alt={item.name} />
                                                        </div>
                                                    </Link>

                                                ) : (
                                                    <Skeleton variant="rectangular" width={"100%"} height={320} />
                                                )}
                                                {item ? (
                                                    <Box className="flex justify-between items-center" sx={{ pr: 2 }}>
                                                        <div className='flex lg:flex-col items-center gap-4'>
                                                            <Typography gutterBottom variant="body2">
                                                                <h3 className='text-md mt-3 font-bold'>{item.name}</h3>
                                                            </Typography>
                                                            <Typography
                                                                variant="caption"
                                                                sx={{ display: 'block', color: 'text.secondary' }}
                                                            >
                                                                <h5 className='text-xl font-bold'>${item.price}</h5>
                                                            </Typography>
                                                        </div>
                                                        {/* Wishlist Icon */}
                                                        <IconButton onClick={() => toggleWishlist(item._id)} color="default">
                                                            {wishlist.includes(item._id) ? (
                                                                <Favorite sx={{ color: pink[500] }} />
                                                            ) : (
                                                                <FavoriteBorder />
                                                            )}
                                                        </IconButton>
                                                        <div className="x">
                                                            <p className={`absolute rounded-full -top-6 left-12 text-red-600 trendingTitle ${item?.isTrending ? "block" : "hidden"}`}>
                                                                Trending Item
                                                            </p>
                                                            <img
                                                                src={trendingIcon}
                                                                className={`absolute rounded-full top-0 left-2 cursor-text ${item?.isTrending ? "block" : "hidden"}`}
                                                            />
                                                        </div>
                                                    </Box>
                                                ) : (
                                                    <Box sx={{ pt: 0.5 }}>
                                                        <Skeleton />
                                                        <Skeleton width="60%" />
                                                    </Box>
                                                )}
                                            </div>
                                        </Box>
                                    ))}
                                </div>
                                {/* Pagination */}
                                <Pagination totalProducts={allProducts.length} productsPerPage={productsPerPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
