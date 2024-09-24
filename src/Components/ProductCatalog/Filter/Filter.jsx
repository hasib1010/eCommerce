import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import useWishlist from '../../Hooks/UseWishlist';

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

    const priceRanges = [
        { label: '$0 - $100', range: [0, 100] },
        { label: '$100 - $500', range: [100, 500] },
        { label: '$500 - $1000', range: [500, 1000] },
        { label: '$1000 - $5000', range: [1000, 5000] },
    ];

    const fetchProducts = async () => {
        try {
            const res = await fetch("https://e-commerce-server-alpha.vercel.app/products/clothings");
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setAllProducts(data.products);
            setFilteredProducts(data.products);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("https://e-commerce-server-alpha.vercel.app/products/clothings/categories");
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

            return categoryMatch && priceMatch && stockMatch;
        });
        setFilteredProducts(filtered);
    }, [selectedCategories, selectedPriceRanges, inStock, allProducts]);

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
        setSelectedCategories([]);
        setSelectedPriceRanges([]);
        setInStock(false);
        setFilteredProducts(allProducts);
    };

    return (
        <div className='min-w-[500px] mr-10 px-4'>
            <div className='border-b py-5 text-2xl flex justify-between items-center'>
                <h4 className='font-semibold'>{`Total ${filteredProducts.length} Items Found`}</h4>
                <button onClick={clearFilters} className='text-red-500 font-bold'>Clear All</button>
            </div>
            <div className='flex mt-4'>
                <div className='flex flex-col border bg-white rounded-lg shadow-md min-w-[450px] p-4'>
                    <div className='flex items-center justify-between'>
                        <h3 className='uppercase text-2xl font-bold'>Filters</h3>
                    </div>
                    {/* Category Filter */}
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
                                            disabled={catName === cat}
                                        />
                                        <label htmlFor={catName} className='cursor-pointer hover:text-blue-500 transition'>
                                            {catName}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Price Range Filter */}
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
                    {/* In Stock Filter */}
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
                </div>
                {/* Products Display */}
                <div className='container mx-auto border-l p-10 bg-gray-50 rounded-lg shadow-md'>
                    <h2 className='text-xl font-semibold mb-4'>Products</h2>
                    <div className='grid grid-cols-4 gap-5'>
                        {filteredProducts.length === 0 ? (
                            <p>No products available.</p>
                        ) : (
                            filteredProducts.map(product => (
                                <div key={product._id} className='border relative rounded-lg p-4 mb-4 bg-white shadow-sm'>
                                    <Link to={`/product/${product._id}`}>
                                        <img src={product.catalogImages[0]} alt={product.name} className='w-full rounded-lg h-96' />
                                        <Typography><h5 className='text-xl my-2'>
                                            {product.name}
                                        </h5></Typography>
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
                </div>
            </div>
        </div>
    );
};

export default Filter;
