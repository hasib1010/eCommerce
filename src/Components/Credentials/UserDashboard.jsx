import React from 'react';
import UserOrders from '../Hooks/UserOrders';

const UserDashboard = () => {
    return (
        <div className='container mx-auto'>
            <h4 className='text-3xl text-center my-10 font-bold'>  UserDashboard</h4>
            <UserOrders></UserOrders>
        </div>
    );
}

export default UserDashboard;