import React, { useEffect, useState } from 'react';
import Marquee from "react-fast-marquee";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const TrendingProducts = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingProducts = async () => {
            try {
                const response = await fetch('http://localhost:3000/products/clothings');
                if (!response.ok) throw new Error('Failed to fetch products');

                const data = await response.json();
                // Filter for trending products
                const filteredTrendingProducts = data.products.filter(product => product.isTrending);

                setTrendingProducts(filteredTrendingProducts);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='mt-10'>
            <h5 className='text-center text-5xl my-5'>Trending Products</h5>
            <Marquee pauseOnHover={true}>
                {trendingProducts.length > 0 ? (
                    trendingProducts.map(product => <Link to={`/product/${product._id}`} key={product._id} >
                        <div className='transition ease-in-out delay-150  py-10 mr-20 hover:-translate-y-1 hover:scale-110  duration-300  flex items-center '>
                            <img className='h-20 rounded-full' src={product?.hoverImageUrl} alt="" />
                            <span className="mx-4">
                                {product?.name}
                            </span>
                        </div>
                    </Link>
                    )
                ) : (
                    <span>No trending products available.</span>
                )}
            </Marquee>
        </div>
    );
}

export default TrendingProducts;
