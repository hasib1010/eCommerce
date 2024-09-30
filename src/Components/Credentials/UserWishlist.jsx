import React, { useEffect, useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../Providers/AuthProvider';
import { Link } from 'react-router-dom';

const UserWishlist = ({ wishList }) => {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productFetches = wishList.map(id =>
                    fetch(`https://e-commerce-server-alpha.vercel.app/products/clothings/${id}`).then(res => {
                        if (!res.ok) throw new Error('Failed to fetch product data');
                        return res.json();
                    })
                );

                const productsData = await Promise.all(productFetches);
                setProducts(productsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (wishList.length > 0) {
            fetchProducts();
        } else {
            setLoading(false);
        }
    }, [wishList]);

    const toggleWishlist = async (productId) => {
        if (!user) {
            Swal.fire({ icon: 'warning', title: 'Have You Logged In?' });
            return;
        }

        const newWishlist = products.filter(product => product._id !== productId).map(product => product._id);
        await updateWishlist(user.uid, newWishlist);
        setProducts(products.filter(product => product._id !== productId)); // Update local state
    };

    const updateWishlist = async (id, updatedWishlist) => {
        const dataToSubmit = { wishList: updatedWishlist };
        try {
            const response = await fetch(`https://e-commerce-server-alpha.vercel.app/users/${id}`, {
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

    if (loading) {
        return <div className="text-white">Loading products...</div>;
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="text-white p-4">
            <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-4'>
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="bg-gray-800 rounded-lg flex flex-col justify-between shadow-lg p-4 max-w-96">
                            <Link to={`/product/${product._id}`}>
                            <img className=' w-full  rounded-md mb-2' src={product.thumbnailImage} alt={product.name} />
                             </Link>
                            <h3 className="text-xl font-semibold mb-1">{product.name}</h3> 
                            <p className="text-yellow-400 font-bold">${product.price}</p>
                            <div className="flex justify-evenly">
                                <button
                                    className="mt-2 bg-red-600 text-white rounded px-4 py-2 hover:bg-red-700"
                                    onClick={() => toggleWishlist(product._id)}
                                >
                                    Remove from Wishlist
                                </button>
                                <Link to={`/product/${product._id}`}
                                    className="mt-2 bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
                                >
                                    View Product
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Your wishlist is empty.</p>
                )}
            </div>
        </div>
    );
};

export default UserWishlist;
