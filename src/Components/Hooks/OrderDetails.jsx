import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const statusStyles = {
    pending: 'bg-yellow-200 text-black',
    shipped: 'bg-blue-200 text-black',
    delivered: 'bg-green-200 text-black',
    cancelled: 'bg-red-200 text-black',
};

const fetchOrderDetails = async (transactionId) => {
    const response = await fetch(`http://localhost:3000/orders/${transactionId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const OrderDetails = () => {
    const { transactionId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getOrderDetails = async () => {
            try {
                const data = await fetchOrderDetails(transactionId);
                setOrder(data);
            } catch (err) {
                setError(err.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Could not fetch order details.',
                });
            } finally {
                setLoading(false);
            }
        };

        getOrderDetails();
    }, [transactionId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!order) return <div>No order found.</div>;

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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Order Details</h1>
            <p className="text-lg text-gray-600 mb-4">Order ID: {order.transactionId}</p>
            <p className="text-lg text-gray-600 mb-4">Confirmed At: {formatDate(order.confirmedAt)}</p>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Items</h2>
            <div className="space-y-4">
                {order.items.map((item) => (
                    <div key={item._id} className="border border-gray-200 p-4 rounded-lg shadow-sm flex items-center space-x-4">
                        <img className="h-24 w-24 object-cover rounded" src={item.thumbnailImage} alt={item.name} />
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p>Size: {item.size}</p>
                            <p>Color: {item.color}</p>
                            <p className="font-bold">${parseFloat(item.price).toFixed(2)}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    </div>
                ))}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6">Order Status</h2>
            <p className={`py-2 px-4 font-semibold rounded ${statusStyles[order.status]}`}>
                {order.status}
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6">Total</h2>
            <p className="font-bold text-gray-800">${parseFloat(order.price).toFixed(2)}</p>
        </div>
    );
};

export default OrderDetails;
