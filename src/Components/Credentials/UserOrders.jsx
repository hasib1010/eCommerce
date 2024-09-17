import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const statusStyles = {
    pending: 'bg-yellow-100 text-yellow-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-green-100 text-green-800',
    canceled: 'bg-red-100 text-red-800',
};

const UserOrders = () => {
    const { user } = useContext(AuthContext);
    const userId = user.uid;
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState({}); // Map of product IDs to product data

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch(`http://localhost:3000/users/${userId}/orders`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("hi", data);

                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }

        async function fetchProducts() {
            try {
                const response = await fetch(`http://localhost:3000/products/clothings`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                console.log('Fetched products:', data);

                const productMap = data.products.reduce((acc, product) => {
                    acc[product._id] = product;
                    return acc;
                }, {});
                setProducts(productMap);
            } catch (error) {
                console.error('Error fetching products:', error);
            }


        }

        fetchOrders();
        fetchProducts();
    }, [userId]);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Your Orders</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="py-3 px-4 text-left text-gray-600">Transaction ID</th>
                            <th className="py-3 px-4 text-left text-gray-600">Name</th>
                            <th className="py-3 px-4 text-left text-gray-600">Size</th>
                            <th className="py-3 px-4 text-left text-gray-600">Color</th>
                            <th className="py-3 px-4 text-left text-gray-600">Price</th>
                            <th className="py-3 px-4 text-left text-gray-600">Quantity</th>
                            <th className="py-3 px-4 text-left text-gray-600">Status</th>
                            <th className="py-3 px-4 text-left text-gray-600">Thumbnail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            const product = products[order.id]; // Map product ID to data
                            const statusClass = statusStyles[order.status] || 'bg-gray-400 text-gray-800'; // Default style for unknown status



                            return (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="py-3 border px-4 text-gray-800">{order.transactionId}</td> {/* Display transaction ID */}
                                    <td className="py-3 border px-4 text-gray-800">{order.items.map(i => <p>{i.name} <br /></p>)}</td>
                                    <td className="py-3 border px-4 text-gray-800">{order.items.map(i => <p>{i.size} <br /></p>)}</td>
                                    <td className="py-3 border px-4 text-gray-800">{order.items.map(i => <p>{i.color} <br /></p>)}</td>
                                    <td className="py-3 border px-4 text-gray-800">${order.price}</td>
                                    <td className="py-3 border px-4 text-gray-800">{order.quantity}</td>
                                    <td className={`py- border3 px-4 font-semibold ${statusClass} rounded`}>{order.status}</td>
                                    <td className="py-3 border px-4">
                                        <div className='flex flex-wrap'>
                                            {
                                                order.items.map(i => <img className='h-14' src={i.thumbnailImage} />)
                                            }
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserOrders;
