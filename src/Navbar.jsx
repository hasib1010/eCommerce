import React, { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { IoLanguageSharp } from 'react-icons/io5';
import { LuShoppingCart } from 'react-icons/lu';
import { RxAvatar } from 'react-icons/rx';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    const [searchBar, setSearchBar] = useState(true);
    const handleSearch = () => {
        setSearchBar(false)
    }

    return (
        <div className='container mx-auto'>
            {
                searchBar ? (<div className='flex justify-between h-20 items-center mt-5 '>
                    <div className='flex-1 flex gap-14 '>
                        <NavLink to={'/shirt'} className='text-2xl font-medium'>Shirt</NavLink>
                        <NavLink to={'/t-shirt'} className='text-2xl font-medium'>T-Shirt</NavLink>
                        <NavLink to={'/hoodies'} className='text-2xl font-medium'>Hoodies</NavLink>
                        <NavLink to={'/jackets'} className='text-2xl font-medium'>Jackets</NavLink>
                    </div>
                    <div className='flex-1 flex items-center justify-center'>
                        <img className='h-16' src="https://fabyoh.com/_next/image?url=https%3A%2F%2Fapi.fabyoh.com%2Flogos%2Fconverted-994938f9-7af3-4b40-97a1-dfe59593f836.webp&w=1920&q=75" alt="" />
                    </div>
                    <div className='flex-1  justify-end items-center flex gap-14 '>
                        <IoMdSearch onClick={handleSearch} className='text-4xl font-bold cursor-pointer' />
                        <IoLanguageSharp className='text-4xl font-bold' />
                        <RxAvatar className='text-4xl font-bold' />
                        <LuShoppingCart className='text-4xl font-bold' />
                    </div>
                </div>) : (
                    <div className='h-20 w-full '>
                        <div className="flex items-center justify-center gap-3  mt-3 mx-auto">
                            <input className='w-[60%] h-20 border' type="text" />
                            <button onClick={() => setSearchBar(true)}>close</button>
                        </div>

                    </div>

                )
            }

        </div>
    );
}


export default NavBar;