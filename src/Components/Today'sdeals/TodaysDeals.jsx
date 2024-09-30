import { useState, useEffect } from 'react';
import { Carousel } from 'primereact/carousel';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';


const TodaysDeals = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '780px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];


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
 
    if (error) return <p>Error: {error}</p>;

    const productTemplate = (product) => {
        return (
            <div className=" surface-border border-round  text-center   px-3  ">
                <div className=" relative w-fit mx-auto  pb-10">
                    {
                        loading?  <Skeleton variant="rectangular" width={"100%"} height={382} />:<Link to={`product/${product._id}`}><img src={product.hoverImageUrl} alt={product.name} className=" h-72 w-fit mx-auto  shadow-2  transition-transform transform hover:scale-105 hover:shadow-md hover:bg-gray-100" /></Link>

                    }
                </div>
            </div>
        );
    };

    return (
        <div className='max-w-screen-xl lg:mx-auto mx-20 mb-10 z-10 relative'>  {/* Added 'relative' class */}
            <div className=''>
                <div className="card">
                    <Carousel
                        value={products}
                        numVisible={3}
                        numScroll={3}
                        responsiveOptions={responsiveOptions}
                        className="custom-carousel"
                        circular
                        autoplayInterval={3000}
                        itemTemplate={productTemplate}
                    />
                </div>
            </div>
        </div>

    );
}

export default TodaysDeals;
