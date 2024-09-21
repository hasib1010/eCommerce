import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Swal from 'sweetalert2';
import { IconButton } from '@mui/material';

const Filter = () => {
    const { cat } = useParams();
    const { user } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);
    const [collapsed, setCollapsed] = useState({
        category: true,
        price: true,
        availability: true,
        trending: true,
    });
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [inStock, setInStock] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]); // Wishlist state

    const fetchProducts = async () => {
        try {
            const res = await fetch("http://localhost:3000/products/clothings");
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setAllProducts(data.products);
            setFilteredProducts(data.products);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    const fetchUserWishlist = async (userId) => {
        try {
            const res = await fetch(`http://localhost:3000/users/${userId}`);
            if (!res.ok) throw new Error('Network response was not ok');
            const data = await res.json();
            setWishlist(data.wishList); // Set user's wishlist
        } catch (error) {
            console.error("Failed to fetch wishlist:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
        if (user) {
            fetchUserWishlist(user.uid); // Fetch wishlist if user is logged in
        }
    }, [user]); // Run this effect when the user changes

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
            const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
            const stockMatch = !inStock || product.stock > 0;

            return categoryMatch && priceMatch && stockMatch;
        });
        setFilteredProducts(filtered);
    }, [selectedCategories, priceRange, inStock, allProducts]);

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

    const clearFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 5000]);
        setInStock(false);
        setFilteredProducts(allProducts);
    };

    const toggleWishlist = (productId) => {
        if (!user) {
            Swal.fire({ icon: 'warning', title: 'Have You Logged In?' });
            return;
        }

        setWishlist(prevWishlist => {
            const newWishlist = prevWishlist.includes(productId)
                ? prevWishlist.filter(id => id !== productId)
                : [...prevWishlist, productId];
            updateWishlist(user.uid, newWishlist);
            return newWishlist;
        });
    };

    const updateWishlist = async (id, updatedWishlist) => {
        const dataToSubmit = { wishList: updatedWishlist };
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSubmit)
            });
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            Swal.fire({ title: 'Update Successful!', text: 'Your wishlist has been updated', icon: 'success' });
        } catch (error) {
            Swal.fire({ title: 'Error!', text: 'An error occurred while updating the wishlist', icon: 'error' });
        }
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
                        <h4 className='text-2xl font-semibold'>Price Range</h4>
                        <input
                            type="range"
                            min={0}
                            max={100000}
                            value={priceRange[0]}
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                        />
                        <input
                            type="range"
                            min={0}
                            max={100000}
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        />
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
                                    <img src={product.thumbnailImage} alt="" />
                                    <h3 className='text-lg font-semibold'>{product.name}</h3>
                                    <p className='text-gray-600'>${product.price}</p>
                                    <div className='absolute bottom-5 right-5'>
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
