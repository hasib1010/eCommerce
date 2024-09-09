import React from 'react';
import { Outlet } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import NavBar from './Navbar';


const Layout = () => {
    return (
        <div>
            <Marquee className=''>
                <div className='flex text-with-outline py-1'> 
                 <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                 <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                 <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                 <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                 <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                 <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3> 
                </div>
            </Marquee>
            <NavBar></NavBar>
            <Outlet></Outlet>
            Layout
        </div>
    );
}


export default Layout;