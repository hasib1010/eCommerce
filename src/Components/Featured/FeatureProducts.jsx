import { Skeleton } from '@mui/material';
import { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';

const FeatureProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredProduct, setHoveredProduct] = useState(null);

    const fetchData = async () => {
        const url = 'https://e-commerce-server-alpha.vercel.app/products/clothings';

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            const productsArray = result.products || [];

            // Filter to get only featured products
            const featuredProducts = productsArray.filter(product => product.isFeatured);
            setProducts(featuredProducts.slice(0, 9)); // Limit to 9 products
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
                    <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
                        <Skeleton className='rounded-md' variant="rectangular" width={320} height={410} />
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
                    <div key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <div
                                className="relative p-4 border h-[450px] border-gray-200 rounded-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                onMouseEnter={() => setHoveredProduct(product._id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <div>
                                    <LazyLoadImage
                                        className={`w-full ${hoveredProduct === product._id ? 'hidden' : 'block'}`}
                                        effect="blur"
                                        onLoad={() => setLoading(false)}
                                        src={product.thumbnailImage}
                                        alt={product.name || 'Product image'}
                                    />
                                    <LazyLoadImage
                                        className={`w-full ${hoveredProduct === product._id ? 'block' : 'hidden'}`}
                                        effect="blur"
                                        src={product.hoverImageUrl}
                                        alt={product.name || 'Product hover image'}
                                    />
                                </div>
                                <p className='text-center absolute bottom-1 w-full'>{product.name || 'No name available'}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureProducts;
