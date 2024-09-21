import { Box, Skeleton, Typography, IconButton } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const FeatureProducts = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState([]);

    const fetchData = async () => {
        const url = 'https://e-commerce-server-alpha.vercel.app/products/clothings';
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const result = await response.json();
            const featuredProducts = result.products.filter(product => product.isFeatured);
            setProducts(featuredProducts.slice(0, 9));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

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
        fetchData();
        fetchUserWishlist(); // Fetch wishlist when component mounts
    }, [user]);

    const toggleWishlist = (productId) => {
        if (!user) {
            Swal.fire({ icon: 'warning', title: 'Have You Logged In?' });
            return;
        }

        setWishlist((prevWishlist) => {
            const newWishlist = prevWishlist.includes(productId)
                ? prevWishlist.filter(id => id !== productId) // Remove from wishlist
                : [...prevWishlist, productId]; // Add to wishlist
            updateWishlist(user.uid, newWishlist); // Update wishlist on server
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

    if (loading) {
        return (
            <div className='grid grid-cols-4 gap-10'>
                {Array.from({ length: 9 }, (_, index) => (
                    <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                        <Skeleton animation="wave" className='rounded-md' variant="rectangular" width={"100%"} height={310} />
                        <Skeleton variant="text" width="80%" height={30} className="mt-2" />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={fetchData} className="mt-2 p-2 bg-blue-500 text-white rounded">Retry</button>
            </div>
        );
    }

    return (
        <div>
            <div className="grid grid-cols-4 gap-10">
                {products.map((product) => (
                    <Box
                        key={product._id}
                        className="relative p-4 border-gray-200 rounded-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                    >
                        <Link to={`/product/${product._id}`}>
                            <div className='flex flex-col gap-5'>
                                <img className='w-full rounded-lg h-96' src={product.thumbnailImage} alt={product.name} />
                                <Box sx={{ pr: 2 }}>
                                    <div className='flex flex-col gap-2'>
                                        <Typography gutterBottom variant="body2">
                                            <h3 className='text-xl mt-3 font-bold'>{product.name}</h3>
                                        </Typography>
                                        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary' }}>
                                            <h5 className='text-xl font-bold'>${parseFloat(product.price).toFixed(2)}</h5>
                                        </Typography>
                                    </div>
                                </Box>
                            </div>
                        </Link>
                        <div className='absolute bottom-5 right-5'>
                            <IconButton onClick={() => toggleWishlist(product._id)}>
                                {wishlist.includes(product._id) ? <Favorite color="error" /> : <FavoriteBorder />}
                            </IconButton>
                        </div>
                    </Box>
                ))}
            </div>
        </div>
    );
};

export default FeatureProducts;
