import React from 'react';
import { Link } from 'react-router-dom';

const LandingCategories = () => {
    return (
        <div className='mb-32'>
            <h1 className='text-4xl mb-10 font-semibold'>Find Your Style</h1>
            <div className='grid lg:grid-cols-3  gap-10 mb-20'>
                <Link to="/navbar/Hoodie">
                    <div className='h-96 relative rounded-xl shadow-2xl px-10 py-20 bg-[url("https://fabyoh.com/_next/image?url=https%3A%2F%2Fapi.fabyoh.com%2Fuploads%2Fconverted-dec50b16-6644-4a4a-b935-330a5ca7e2ce.webp&w=1920&q=75")] bg-cover bg-center transition-transform transform hover:scale-105 duration-300 ease-in-out will-change-transform'>
                        <div className='absolute inset-0 bg-black bg-opacity-30 rounded-xl hover:bg-opacity-50 transition-colors duration-300'></div>
                        <div className='relative z-10'>
                            <h3 className='lg:text-5xl text-3xl font-semibold text-white'>Premium <br /> Products</h3>
                            <button className='underline underline-offset-8 mt-5 text-white text-2xl font-semibold'>Shop Now</button>
                        </div>
                    </div>
                </Link>
                <Link to="/AllProducts">
                    <div className='h-96 relative rounded-xl shadow-2xl px-10 py-20 bg-[url("https://fabyoh.com/_next/image?url=https%3A%2F%2Fapi.fabyoh.com%2Fuploads%2Fconverted-43fb094d-d266-4fde-ad6e-921c175a0842.webp&w=1920&q=75")] bg-cover bg-center transition-transform transform hover:scale-105 duration-300 ease-in-out will-change-transform'>
                        <div className='absolute inset-0 bg-black bg-opacity-30 rounded-xl hover:bg-opacity-50 transition-colors duration-300'></div>
                        <div className='relative z-10'>
                            <h3 className='lg:text-5xl text-3xl font-semibold text-white'>Pure <br /> Cotton</h3>
                            <button className='underline underline-offset-8 mt-5 text-white text-2xl font-semibold'>Shop Now</button>
                        </div>
                    </div>
                </Link>
                <Link to="/AllProducts">
                    <div className='h-96 relative rounded-xl shadow-2xl px-10 py-20 bg-[url("https://fabyoh.com/_next/image?url=https%3A%2F%2Fapi.fabyoh.com%2Fuploads%2Fconverted-95757a5d-2606-4803-8e65-b651f3802b5e.webp&w=1920&q=75")] bg-cover bg-center transition-transform transform hover:scale-105 duration-300 ease-in-out will-change-transform'>
                        <div className='absolute inset-0 bg-black bg-opacity-30 rounded-xl hover:bg-opacity-50 transition-colors duration-300'></div>
                        <div className='relative z-10'>
                            <h3 className='lg:text-5xl text-3xl font-semibold text-white'>Newly <br /> Launched</h3>
                            <button className='underline underline-offset-8 mt-5 text-white text-2xl font-semibold'>Shop Now</button>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default LandingCategories;
