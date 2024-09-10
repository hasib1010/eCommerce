import React, { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';  

const FeatureProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [wishlist, setWishlist] = useState(new Set());  

    const fetchData = async () => {
        const url = 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=us&lang=en&currentpage=0&pagesize=30&categories=men_all&concepts=H%26M%20MAN';
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'b59fc4593bmsh8d89fcd214b16cep1794fajsn6ebaf33730e0',
                'x-rapidapi-host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log(result); // Debugging the structure of the result
            const productsArray = result.results || []; // Adjust based on actual response structure
            setProducts(productsArray.slice(0, 8));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleWishlist = (code) => {
        setWishlist((prevWishlist) => {
            const newWishlist = new Set(prevWishlist);
            if (newWishlist.has(code)) {
                newWishlist.delete(code);
            } else {
                newWishlist.add(code);
            }
            return newWishlist;
        });
    };

    if (loading) return (
        <div>
            <img className='w-1/3 mx-auto rounded-full' src="https://cdn.dribbble.com/users/1019864/screenshots/10758864/fashion3.gif" alt="Loading" />
            <p className='text-center mt-3 font-bold'>Loading...</p>
        </div>
    );
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='mb-20'>
            <div className="grid grid-cols-4 gap-20">
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="relative shadow-xl cursor-pointer pb-5 rounded-xl transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-100"
                    >
                        {/* Wishlist Icon */}
                        <button
                            className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-colors"
                            onClick={() => toggleWishlist(product.code)}
                        >
                            <HeartIcon
                                className={`w-6 h-6 ${wishlist.has(product.code) ? 'text-red-500' : 'text-gray-400'}`}
                            />
                        </button>

                        {product.images && product.images.length > 0 ? (
                            <img
                                className='rounded-t-xl w-full'
                                src={product.images[0].baseUrl}
                                alt={product.name || 'Product image'}
                            />
                        ) : (
                            <p>No Image Available</p>
                        )}
                        <p className='text-xl font-bold mt-3 text-center'>{product.name || 'No name available'}</p>
                        <p className='text-sm text-red-600 font-bold mt-3 text-center'>flat 20% Discount</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeatureProducts;
