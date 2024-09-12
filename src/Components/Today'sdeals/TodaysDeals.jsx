import   { useState, useEffect } from 'react'; 
import { Carousel } from 'primereact/carousel'; 
import { Link } from 'react-router-dom';


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
            breakpoint: '767px',
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
            console.log(result);
            const productsArray = result.results || [];
            setProducts(productsArray.slice(9,19  ));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return (
        <div>
            <img className='w-1/3 mx-auto rounded-full' src="https://cdn.dribbble.com/users/1019864/screenshots/10758864/fashion3.gif" alt="Loading" />
            <p className='text-center mt-3 font-semibold'>Loading...</p>
        </div>
    );
    if (error) return <p>Error: {error}</p>;

    const productTemplate = (product) => {
        return (
            <div className=" surface-border border-round  text-center   px-3">
                <div className=" relative w-fit mx-auto  pb-10">
                    <Link to={"#"}><img src={product.images[0].url} alt={product.name} className=" w-fit mx-auto  shadow-2" /></Link>
                    <p className='absolute bottom-1 left-0    text-xl text-white font-bold text-center bg-[#8567e6] w-full'><span className=' '>{product.name}</span>
                        <br /> <span className='text-base'>25% Discount</span>
                    </p>
                    <p></p>
                </div>
            </div>
        );
    };

    return (
        <div className='max-w-screen-xl mx-auto mb-10 z-10 relative'>  {/* Added 'relative' class */}
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
