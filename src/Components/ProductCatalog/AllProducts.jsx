import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const AllProducts = () => {
    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [wishlist, setWishlist] = useState([]);

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
                    <div className='min-w-[500px] mr-10 px-4'>
                        <div className='border-b py-5 text-2xl flex justify-between items-center'>
                            {loading ? (
                                <Skeleton animation="wave" width={300} variant="text" sx={{ fontSize: '5rem' }} />
                            ) : (
                                <h4 className='font-semibold'>{`Total ${allProducts.length} Items Found`}</h4>
                            )}
                        </div>
                        <div className='flex mt-4'>
                            <div className='flex flex-col border bg-white rounded-lg shadow-md min-w-[450px] p-4'>
                                <div className='border-b py-4'>
                                    <h4 className='text-2xl font-semibold cursor-pointer flex justify-between items-center'>
                                        Category
                                    </h4>
                                    {loading ? (
                                        Array.from(new Array(9)).map((_, index) => (
                                            <Skeleton key={index} animation="wave" width={300} variant="text" sx={{ fontSize: '3rem' }} />
                                        ))
                                    ) : (
                                        categories.map((item, index) => (
                                            <Link key={index} to={`/navbar/${item}`}>
                                                <h4 className='font-semibold text-2xl mt-10 border px-2 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900'>{item}</h4>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                            <div className='container mx-auto border-l p-10 bg-gray-50 rounded-lg shadow-md'>
                                <h2 className='text-xl font-semibold mb-4'>Products</h2>
                                <div className='grid grid-cols-3 place-items-center'>
                                    {(loading ? Array.from(new Array(9)) : allProducts).map((item, index) => (
                                        <Box className="border rounded-md p-3" key={item ? item._id : index} sx={{ width: 290, height: 450, marginRight: 0.5, my: 5 }}>
                                            <div className='flex flex-col gap-5'>
                                                {item ? (
                                                    <img
                                                        className='w-fit mx-auto rounded-md'
                                                        style={{ width: 256, height: 320 }}
                                                        alt={item.title}
                                                        src={item.hoverImageUrl}
                                                    />
                                                ) : (
                                                    <Skeleton variant="rectangular" width={256} height={320} />
                                                )}
                                                {item ? (
                                                    <Box sx={{ pr: 2 }}>
                                                        <div className='flex flex-col gap-4'>
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
                                                        <IconButton
                                                            onClick={() => toggleWishlist(item._id)}
                                                            color="default"
                                                        >
                                                            {wishlist.includes(item._id) ? (
                                                                <Favorite />
                                                            ) : (
                                                                <FavoriteBorder />
                                                            )}
                                                        </IconButton>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
