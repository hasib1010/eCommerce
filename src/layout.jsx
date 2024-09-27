import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Marquee from "react-fast-marquee";
import NavBar from './Navbar';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import Footer from './Components/Footer/Footer';

const Layout = () => {
    const location = useLocation();
    const lenis = useLenis();

    useEffect(() => {
        // Scroll to top on route change
        if (lenis) {
            lenis.scrollTo(0, { duration: 0.9 });
        }
    }, [location.pathname, lenis]);

    return (

        <div className='relative pb-[80px] lg:pb-0 bg-[#f8f7f7]'>
            <div className='w-full bg-[#8567e6]'>
                <Marquee className='py-1'>
                    <div className='flex text-with-outline'>
                        {[...Array(20)].map((_, index) => (
                            <h3 key={index} className='mr-32'>30% OFF - Offer Ends Tomorrow - Grab Now</h3>
                        ))}
                    </div>
                </Marquee>
            </div>

            <NavBar />
            <ReactLenis root
                options={{
                    smooth: true,
                    duration: 1.8,
                }}
            >
                <div>
                    <Outlet />
                </div>
            </ReactLenis>

            <Footer />
        </div>
    );
}

export default Layout;
