import React from 'react';
import { useNavigate } from 'react-router-dom';  

const Cancel = () => {
    const navigate = useNavigate();   
 

    const handleHome = () => { 
        navigate('/');
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Canceled</h1>
                <p className="text-gray-600 mb-6">
                    It looks like you canceled the payment process. Don't worry, your order has not been processed.
                </p>
                <div className="flex justify-center space-x-4"> 
                    <button
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
                        onClick={handleHome}
                    >
                        Return Home
                    </button>
                </div>
                <div className="mt-4">
                    <p className="text-gray-500">
                        Need help? <a href="/support" className="text-blue-500 underline">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Cancel;
