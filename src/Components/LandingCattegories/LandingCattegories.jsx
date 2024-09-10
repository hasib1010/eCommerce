import React from 'react';
import { Link } from 'react-router-dom';

const LandingCategories = () => {
    return (
        <div className='mb-32'>
            <h1 className='text-4xl mb-10 font-semibold'>Find Your Style</h1>
            <div className='grid grid-cols-3 gap-10 mb-20'>
                <Link to="#">
                    <div className='h-96 relative rounded-xl shadow-2xl px-10 py-20 bg-[url("https://fabyoh.com/_next/image?url=https%3A%2F%2Fapi.fabyoh.com%2Fuploads%2Fconverted-485766cd-2441-46d4-b051-7a02fc5f8dcd.webp&w=1920&q=75")] bg-cover bg-center transition-transform transform hover:scale-105 duration-300 ease-in-out will-change-transform'>
                        <div className='absolute inset-0 bg-black bg-opacity-30 rounded-xl hover:bg-opacity-50 transition-colors duration-300'></div>
                        <div className='relative z-10'>
                            <h3 className='text-5xl font-semibold text-white'>Premium <br /> Shirts</h3>
                            <button className='underline underline-offset-8 mt-5 text-white text-2xl font-semibold'>Shop Now</button>
                        </div>
                    </div>
                </Link>
                <Link to="#">
                    <div className='h-96 relative rounded-xl shadow-2xl px-10 py-20 bg-[url("https://fabyoh.com/_next/image?url=https%3A%2F%2Fapi.fabyoh.com%2Fuploads%2Fconverted-5bf311e5-6cf1-46c6-b5e9-64c50e13a6a7.webp&w=1920&q=75")] bg-cover bg-center transition-transform transform hover:scale-105 duration-300 ease-in-out will-change-transform'>
                        <div className='absolute inset-0 bg-black bg-opacity-30 rounded-xl hover:bg-opacity-50 transition-colors duration-300'></div>
                        <div className='relative z-10'>
                            <h3 className='text-5xl font-semibold text-white'>Pure <br /> Cotton</h3>
                            <button className='underline underline-offset-8 mt-5 text-white text-2xl font-semibold'>Shop Now</button>
                        </div>
                    </div>
                </Link>
                <Link to="#">
                    <div className='h-96 relative rounded-xl shadow-2xl px-10 py-20 bg-[url("https://fabyoh.com/_next/image?url=https%3A%2F%2Fapi.fabyoh.com%2Fuploads%2Fconverted-1edae0b4-3881-461e-842f-569e703efbe1.webp&w=1920&q=75")] bg-cover bg-center transition-transform transform hover:scale-105 duration-300 ease-in-out will-change-transform'>
                        <div className='absolute inset-0 bg-black bg-opacity-30 rounded-xl hover:bg-opacity-50 transition-colors duration-300'></div>
                        <div className='relative z-10'>
                            <h3 className='text-5xl font-semibold text-white'>Newly <br /> Launched</h3>
                            <button className='underline underline-offset-8 mt-5 text-white text-2xl font-semibold'>Shop Now</button>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default LandingCategories;
