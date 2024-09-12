import { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const FeatureProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState(new Set());
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const fetchData = async () => {
        const url = 'http://localhost:3000/products/clothings';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result);  
            const productsArray = result.products || [];
            setProducts(productsArray);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleWishlist = (_id) => {
        setWishlist((prevWishlist) => {
            const newWishlist = new Set(prevWishlist);
            if (newWishlist.has(_id)) {
                newWishlist.delete(_id);
            } else {
                newWishlist.add(_id);
            }
            return newWishlist;
        });
    };

    if (loading) {
        return (
            <div>
                <img className='w-1/3 mx-auto' src="https://cdn.dribbble.com/users/1019864/screenshots/10758864/fashion3.gif" alt="Loading" />
                <p className='text-center mt-3 font-semibold'>Loading...</p>
            </div>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };
    return (
        <div className='mb-20'>
            <div className="grid grid-cols-4 gap-20">
                {products.map((product) => (
                    < div
                        key={product._id}
                        className="relative shadow-xl cursor-pointer pb-5 rounded-xl transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
                        onMouseEnter={() => setHoveredProduct(product._id)}
                        onMouseLeave={() => setHoveredProduct(null)}
                    >
                        {/* Wishlist Icon */}
                        <button
                            className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-colors"
                            onClick={() => toggleWishlist(product._id)}
                        >
                            <HeartIcon
                                className={`w-6 h-6 ${wishlist.has(product._id) ? 'text-red-500' : 'text-gray-400'}`}
                            />
                        </button>

                        {/* Product Image */}
                        <Link to={`product/${product._id}`}>
                            <img
                                className='rounded-t-xl w-full'
                                src={hoveredProduct === product._id ? product.hoverImageUrl : product.thumbnailImage}
                                alt={product.name || 'Product image'}
                            />
                            <p className='text-xl font-semibold mt-3 text-center'>{product.name || 'No name available'}</p>
                            <p className='text-sm text-red-600 font-semibold mt-3 text-center '>
                                {product.discountAmount ? (
                                    <>
                                        Flat {product.discountAmount}% Discount until{' '} <br />
                                        <span className='underline text-green-600 font-bold italic underline-offset-4'>{formatDate(product.discountValidUntil)}</span>
                                    </>
                                ) : 'No Discount'}
                            </p>
                        </Link>

                    </div>

                ))}
            </div>
        </div >
    );
};

export default FeatureProducts;
