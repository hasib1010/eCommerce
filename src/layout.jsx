import React from 'react';
import { Outlet } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import NavBar from './Navbar';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import Footer from './Components/Footer/Footer';


const Layout = () => {
    const lenis = useLenis(({ scroll }) => {

    })

    return (
        <ReactLenis root
            options={{
                smooth: true,
                duration: 1.8,
            }}
        >
            <div className='relative pb-[80px] lg:pb-0'  >

                <div className='w-full  bg-[#8567e6]'>
                    <Marquee className='py-1'>
                        <div className='flex text-with-outline'>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                            <h3 className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                        </div>
                    </Marquee>
                </div>

                <NavBar />

                <div className=' '>
                    <Outlet />
                </div>
                <Footer></Footer>

            </div>
        </ReactLenis>
    );
}

export default Layout;
