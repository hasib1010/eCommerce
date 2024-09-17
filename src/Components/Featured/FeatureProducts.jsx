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

    return (
        <div>
            <div className="grid grid-cols-4 gap-10">
                {products.map((product) => (
                    <div key={product._id} >
                        <Link className='' to={`/product/${product._id}`}>
                            <div
                                className="relative p-4 border h-[450px] border-gray-200 rounded-md overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                onMouseEnter={() => setHoveredProduct(product._id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                <LazyLoadImage
                                    className={`w-full    ${hoveredProduct === product._id ? 'hidden' : 'block'}`}
                                    effect="blur"

                                    src={product.thumbnailImage}
                                    alt={product.name || 'Product image'}
                                />
                                <LazyLoadImage
                                    className={`w-full    ${hoveredProduct === product._id ? 'block' : 'hidden'}`}
                                    effect="blur"

                                    src={product.hoverImageUrl}
                                    alt={product.name || 'Product hover image'}
                                />
                                <p className='text-center absolute bottom-1 w-full '>{product.name || 'No name available'}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureProducts;
