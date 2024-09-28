import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import UserOrders from '../Hooks/UserOrders';
import Profile from './Profile/Profile';
import { Home, Favorite, ShoppingCart } from '@mui/icons-material';
import UserWishlist from './UserWishlist';

export default function VerticalTabs() {
    const [value, setValue] = useState(0);
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && user.uid) {
                try {
                    const response = await fetch(`http://localhost:3000/users/${user.uid}`);
                    if (!response.ok) throw new Error('Failed to fetch user data');
                    const data = await response.json();
                    setUserData(data);
                } catch (err) {
                    console.error(err);
                }
            }
        };

        fetchUserData();
    }, [user]);

    const handleChange = (index) => {
        setValue(index);
    };

    return (
        <div className="flex flex-col md:flex-row lg:h-full lg:min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-xl">
            <div className="flex flex-col md:w-1/4 min-w-60 border-r border-gray-300 bg-gray-800">
                <button
                    className={`flex items-center p-4 text-left transition duration-300 transform hover:scale-105 ${value === 0 ? 'bg-blue-700 text-white border-b-4 border-blue-300' : 'text-gray-200 hover:bg-blue-600'
                        } rounded-lg`}
                    onClick={() => handleChange(0)}
                >
                    <Home className="mr-2" /> Profile
                </button>
                <button
                    className={`flex items-center p-4 text-left transition duration-300 transform hover:scale-105 ${value === 1 ? 'bg-blue-700 text-white border-b-4 border-blue-300' : 'text-gray-200 hover:bg-blue-600'
                        } rounded-lg`}
                    onClick={() => handleChange(1)}
                >
                    <Favorite className="mr-2" />
                    Favorite Products ({userData?.wishList ? userData.wishList.length : 0})
                    <p></p>
                </button>
                <button
                    className={`flex items-center p-4 text-left transition duration-300 transform hover:scale-105 ${value === 2 ? 'bg-blue-700 text-white border-b-4 border-blue-300' : 'text-gray-200 hover:bg-blue-600'
                        } rounded-lg`}
                    onClick={() => handleChange(2)}
                >
                    <ShoppingCart className="mr-2" />
                    Orders ({userData?.orders ? userData.orders.length : 0})
                </button>
            </div>
            <div className="flex-grow lg:p-6 bg-gray-900 rounded-lg">
                {value === 0 && <Profile />}
                {value === 1 && <UserWishlist wishList={userData.wishList} />}
                {value === 2 && <UserOrders />}
            </div>
        </div>
    );
}
