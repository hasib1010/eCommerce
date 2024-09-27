import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconButton, Typography, Skeleton } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import useWishlist from '../../Hooks/UseWishlist';
import trendingIcon from "./../../../assets/trending.gif";

const Filter = () => {
    const { cat } = useParams();
    const [categories, setCategories] = useState([]);
    const [collapsed, setCollapsed] = useState({
        category: true,
        price: true,
        availability: true,
    });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [inStock, setInStock] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { wishlist, toggleWishlist } = useWishlist();
    const [showTrending, setShowTrending] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 10 : 12);
    const [showFilters, setShowFilters] = useState(false);
    const [loading, setLoading] = useState(true); // Loading state

    const priceRanges = [
        { label: '$0 - $100', range: [0, 100] },
        { label: '$100 - $500', range: [100, 500] },
        { label: '$500 - $1000', range: [500, 1000] },
        { label: '$1000 - $5000', range: [1000, 5000] },
    ];

    const fetchProducts = async () => {
        setLoading(true); // Start loading
        try {
            const res = await fetch("http://localhost:3000/products/clothings");
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setAllProducts(data.products);
            setFilteredProducts(data.products);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false); // End loading
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
    }, [cat]);

    useEffect(() => {
        if (cat && categories.includes(cat)) {
            setSelectedCategories([cat]);
        }
    }, [cat, categories]);

    useEffect(() => {
        const filtered = allProducts.filter(product => {
            const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const priceMatch = selectedPriceRanges.length === 0 || selectedPriceRanges.some(range => product.price >= range[0] && product.price <= range[1]);
            const stockMatch = !inStock || product.stock > 0;
            const trendingMatch = !showTrending || product.isTrending;

            return categoryMatch && priceMatch && stockMatch && trendingMatch;
        });
        setFilteredProducts(filtered);
    }, [selectedCategories, selectedPriceRanges, inStock, showTrending, allProducts]);

    const handleTrendingChange = () => {
        setShowTrending(prev => !prev);
    };

    const toggleCollapse = (section) => {
        setCollapsed(prev => ({ ...prev, [section]: !prev[section] }));
    };

    const handleCheckboxChange = (category) => {
        if (category === cat) return;

        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(cat => cat !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    const handlePriceRangeChange = (range) => {
        setSelectedPriceRanges(prev => {
            if (prev.some(selectedRange => selectedRange[0] === range[0] && selectedRange[1] === range[1])) {
                return prev.filter(selectedRange => selectedRange[0] !== range[0] || selectedRange[1] !== range[1]);
            } else {
                return [...prev, range];
            }
        });
    };

    const clearFilters = () => {
        setSelectedCategories([cat]);
        setSelectedPriceRanges([]);
        setInStock(false);
        setFilteredProducts(allProducts);
    };

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handleResize = () => {
        setItemsPerPage(window.innerWidth < 768 ? 10 : 12);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='lg:mr-10 lg:px-4'>
            <div className='border-b py-5 text-2xl flex justify-between items-center'>
                <h4 className='font-semibold'>{`Total ${filteredProducts.length} Items Found`}</h4>
                <button onClick={clearFilters} className='text-red-500 font-bold'>Clear All</button>
            </div>
            <div className='flex lg:flex-row flex-col mt-4'>
                <div className='flex flex-col border  bg-white rounded-lg shadow-md  p-4'>
                    <div className='flex   w-[100%] items-center justify-between'>
                        <h3 className='uppercase lg:text-2xl font-bold'>Filters</h3>
                        <button onClick={() => setShowFilters(prev => !prev)} className='text-lg md:hidden'>
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                    </div>
                    <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
                        <div className='border-b py-4'>
                            <h4 className='text-2xl font-semibold cursor-pointer flex justify-between items-center' onClick={() => toggleCollapse('category')}>
                                Category <span>{collapsed.category ? '▼' : '▲'}</span>
                            </h4>
                            {!collapsed.category && (
                                <div className='py-2'>
                                    {categories.map((catName, index) => (
                                        <div key={index} className='flex items-center gap-3 my-2 text-lg'>
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(catName)}
                                                onChange={() => handleCheckboxChange(catName)}
                                                className='cursor-pointer'
                                                id={catName}
                                            />
                                            <label htmlFor={catName} className='cursor-pointer hover:text-blue-500 transition'>
                                                {catName}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='border-b py-4'>
                            <h4 className='text-2xl font-semibold cursor-pointer flex justify-between items-center' onClick={() => toggleCollapse('price')}>
                                Price Range <span>{collapsed.price ? '▼' : '▲'}</span>
                            </h4>
                            {!collapsed.price && (
                                <div className='py-2'>
                                    {priceRanges.map((range, index) => (
                                        <div key={index} className='flex items-center gap-3 my-2 text-lg'>
                                            <input
                                                type="checkbox"
                                                checked={selectedPriceRanges.some(selectedRange => selectedRange[0] === range.range[0] && selectedRange[1] === range.range[1])}
                                                onChange={() => handlePriceRangeChange(range.range)}
                                                className='cursor-pointer'
                                                id={range.label}
                                            />
                                            <label htmlFor={range.label} className='cursor-pointer hover:text-blue-500 transition'>
                                                {range.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='border-b py-4'>
                            <h4 className='text-2xl font-semibold'>In Stock</h4>
                            <input
                                type="checkbox"
                                checked={inStock}
                                onChange={() => setInStock(!inStock)}
                                className='cursor-pointer'
                            />
                            <label className='ml-2'>Show Only In Stock</label>
                        </div>
                        <div className='border-b py-4'>
                            <h4 className='text-2xl font-semibold'>Trending Products</h4>
                            <input
                                type="checkbox"
                                checked={showTrending}
                                onChange={handleTrendingChange}
                                className='cursor-pointer'
                            />
                            <label className='ml-2'>Show Only Trending</label>
                        </div>
                    </div>
                </div>

                <div className='container mx-auto border-l lg:p-10 px-1 bg-gray-50 rounded-lg shadow-md'>
                    <h2 className='text-xl font-semibold mb-4'>Products</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
                        {loading ? (
                            Array.from({ length: itemsPerPage }).map((_, index) => (
                                <div key={index} className='border relative rounded-lg p-4 mb-4 bg-white shadow-sm'>
                                    <Skeleton variant="rectangular" width="100%" height={250} />
                                    <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                </div>
                            ))
                        ) : currentProducts.length === 0 ? (
                            <p>No products available.</p>
                        ) : (
                            currentProducts.map(product => (
                                <div key={product._id} className='border relative rounded-lg p-4 mb-4 bg-white shadow-sm'>
                                    <Link to={`/product/${product._id}`}>
                                        <img src={product.catalogImages[0]} alt={product.name} className='w-full rounded-lg h-96' />
                                        <div className="x">
                                            <p className={`absolute rounded-full top-0 left-12 text-red-600 trendingTitle ${product?.isTrending ? "block" : "hidden"}`}>
                                                Trending Item
                                            </p>
                                            <img
                                                src={trendingIcon}
                                                className={`absolute rounded-full top-0 left-0 ${product?.isTrending ? "block" : "hidden"}`}
                                            />
                                        </div>
                                        <Typography>
                                            <h5 className='text-xl my-2'>
                                                {product.name}
                                            </h5>
                                        </Typography>
                                        <Typography>${parseFloat(product.price).toFixed(2)}</Typography>
                                    </Link>
                                    <div className='absolute bottom-3 right-9'>
                                        <IconButton onClick={() => toggleWishlist(product._id)}>
                                            {wishlist.includes(product._id) ? <Favorite color="error" /> : <FavoriteBorder />}
                                        </IconButton>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className='flex justify-evenly my-4'>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`bg-blue-500 text-white px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-400" : ""}`}
                        >
                            Previous
                        </button>
                        <span>{`Page ${currentPage} of ${totalPages}`}</span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`bg-blue-500 text-white px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-400" : ""}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
