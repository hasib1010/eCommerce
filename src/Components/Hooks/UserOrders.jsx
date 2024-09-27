import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const statusStyles = {
    pending: 'bg-yellow-200 text-black',
    shipped: 'bg-blue-200 text-black',
    delivered: 'bg-green-200 text-black',
    cancelled: 'bg-red-200 text-black',
};

const fetchOrders = async (userId) => {
    const response = await fetch(`http://localhost:3000/users/${userId}/orders`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const fetchProducts = async () => {
    const response = await fetch(`http://localhost:3000/products/clothings`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const UserOrders = () => {
    const { user } = useContext(AuthContext);
    const userId = user.uid;

    const { data: orders = [], refetch: refetchOrders } = useQuery({
        queryKey: ['orders', userId],
        queryFn: () => fetchOrders(userId),
        enabled: !!userId,
        refetchInterval: 1000,
    });

    const { data: productsData = {} } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    const products = productsData.products || {};

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Your Orders</h1>
            <h2 className="text-xl text-center mb-4 text-gray-600">Welcome, {user?.displayName || "User"}!</h2>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            {['Transaction ID', 'Confirmed At', 'Name', 'Size', 'Color', 'Price', 'Quantity', 'Status', 'Thumbnail'].map(header => (
                                <th key={header} className="py-3 px-4 text-left text-gray-600">{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.slice().reverse().map((order, index) => {
                            const statusClass = statusStyles[order.status] || 'bg-gray-400 text-gray-800';

                            const formatDate = (dateString) => {
                                const options = {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                };
                                return new Date(dateString).toLocaleString(undefined, options);
                            };

                            return (
                                <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
                                    <td className="py-3 border px-4 text-gray-800">{order.transactionId}</td>
                                    <td className="py-3 border px-4 text-gray-800">
                                        {order?.confirmedAt ? formatDate(order.confirmedAt) : "No date"}
                                    </td>
                                    <td className="py-3 border px-4 text-gray-800">{order.items.map(i => <p key={i._id}>{i.name}</p>)}</td>
                                    <td className="py-3 border px-4 text-gray-800">{order.items.map(i => <p key={i._id}>{i.size}</p>)}</td>
                                    <td className="py-3 border px-4 text-gray-800">{order.items.map(i => <p key={i._id}>{i.color}</p>)}</td>
                                    <td className="py-3 border px-4 text-gray-800">${order.price.toFixed(2)}</td>
                                    <td className="py-3 border px-4 text-gray-800">{order.quantity}</td>
                                    <td className={`py-3 px-4 font-semibold ${statusClass} rounded`}>{order.status}</td>
                                    <td className="py-3 border px-4">
                                        <div className='flex flex-wrap'>
                                            {order.items.map(i => <img key={i._id} className='h-14 w-14 object-cover rounded' src={i.thumbnailImage} alt={i.name} />)}
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
