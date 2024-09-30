import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const statusStyles = {
    pending: 'bg-yellow-200 text-black',
    shipped: 'bg-blue-200 text-black',
    delivered: 'bg-green-200 text-black',
    cancelled: 'bg-red-200 text-black',
};

const fetchOrders = async (userId) => {
    const response = await fetch(`https://e-commerce-server-alpha.vercel.app/users/${userId}/orders`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const UserOrders = () => {
    const { user } = useContext(AuthContext);
    const userId = user.uid;

    const { data: orders = [] } = useQuery({
        queryKey: ['orders', userId],
        queryFn: () => fetchOrders(userId),
        enabled: !!userId,
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-xl text-center mb-4 text-white">Welcome, {user?.displayName || "User"}!</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

                    const firstItem = order.items[0];
                    const additionalCount = order.items.length - 1;

                    return (
                        <Link to={`/orders/${order.transactionId}`} key={index} className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-200">
                            <div className="p-4 bg-slate-400">
                                <h3 className="text-lg font-semibold text-gray-800">Order ID: {order.transactionId}</h3>
                                <p className="text-sm text-gray-600">Confirmed At: {order?.confirmedAt ? formatDate(order.confirmedAt) : "No date"}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    {firstItem && (
                                        <img className='h-16 w-16 object-cover rounded' src={firstItem.thumbnailImage} alt={firstItem.name} />
                                    )}
                                    <div className="flex-1">
                                        <p className="font-semibold">{firstItem?.name}</p>
                                        {additionalCount > 0 && (
                                            <p className="text-sm text-gray-600">+ {additionalCount} more item(s)</p>
                                        )}
                                        <p className="text-sm text-gray-600">Size: {firstItem?.size}</p>
                                        <p className="text-sm text-gray-600">Color: {firstItem?.color}</p>
                                        <p className="font-bold text-gray-800">${parseFloat(firstItem?.price || 0).toFixed(2)}</p>
                                        <p className="text-gray-600">Quantity: {firstItem?.quantity || 0}</p>
                                    </div>
                                </div>
                                <p className={`py-1 px-2 font-semibold ${statusClass} rounded mt-2`}>{order.status}</p>
                                <p className="font-bold text-gray-800 mt-2">Total: ${parseFloat(order.price || 0).toFixed(2)}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default UserOrders;
