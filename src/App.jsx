import { useState } from 'react'
import './App.css'
import Slider from './Components/Slider/Slider'

import Marquee from "react-fast-marquee";
import LandingCattegories from './Components/LandingCattegories/LandingCattegories';
import FeatureProducts from './Components/Featured/FeatureProducts';

function App() {

  return (
    <>
      <Slider></Slider>
      <div className='w-full  bg-[#8567e6]'>
        <Marquee className='py-1 mt-2'>
          <div className='flex text-with-outline'>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
          </div>
        </Marquee>
      </div>
      <div className="container mx-auto mt-20">
        <LandingCattegories />
        <h3 className="text-4xl mb-10 font-bold text-center">Feature Products</h3>
        <div className='mb-20'>
          <FeatureProducts></FeatureProducts>
        </div>
      </div>

    </>
  )
}

export default App
