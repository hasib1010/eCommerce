import { Box, Skeleton, Typography, IconButton } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import useWishlist from '../Hooks/UseWishlist';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { pink } from '@mui/material/colors';

const FeatureProducts = () => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { wishlist, toggleWishlist } = useWishlist();

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

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className='grid grid-cols-4 gap-10'>
                {Array.from({ length: 9 }, (_, index) => (
                    <Skeleton key={index} variant="rectangular" width={"100%"} height={310} />
                ))}
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-4 gap-10">
            {products.map((product) => (
                <Box key={product._id} className="relative p-4 group border-gray-200 rounded-md overflow-hidden border">
                    <Link to={`/product/${product._id}`}>
                        <div className='min-h-96 relative'>
                            <img className='w-full absolute top-0 rounded-lg h-96 group-hover:opacity-0 duration-300 ease-in-out' src={product.catalogImages[0]} alt={product.name} />
                            <img className='w-full rounded-lg h-96 group-hover:opacity-100 duration-300 ease-in-out' src={product.catalogImages[1]} alt={product.name} />
                        </div>

                    </Link>
                    <div className="flex items-center justify-between mt-5">
                        <Link to={`/product/${product._id}`}> <h5>{product.name} </h5></Link>
                        <IconButton onClick={() => toggleWishlist(product._id)}>
                            {wishlist.includes(product._id) ? <Favorite sx={{ color: pink[500] }} /> : <FavoriteBorder />}
                        </IconButton></div>
                </Box>
            ))}
        </div>
    );
};

export default FeatureProducts;
