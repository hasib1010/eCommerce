import { useState } from 'react'
import './App.css'
import Slider from './Components/Slider/Slider'

import Marquee from "react-fast-marquee";
import LandingCattegories from './Components/LandingCattegories/LandingCattegories';
import FeatureProducts from './Components/Featured/FeatureProducts';
import logo1 from './assets/logo/free.png'
import logo2 from './assets/logo/pay.png'
import logo3 from './assets/logo/return.png'
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
        <h3 className="text-4xl  mb-10 font-semibold text-center">Feature Products</h3>
        <div className='mb-20'>
          <FeatureProducts></FeatureProducts>
        </div>
      </div>
      <div className='border-y-2  my-10'>
        <div className="container mx-auto  justify-evenly py-5 flex">
          <div className='flex items-center gap-3'>
            <img className='rounded-full w-20 border-4 border-black p-1' src={logo1} alt="" />
            <div>
              <h4 className='text-2xl font-semibold'>Free Delivery</h4>
              <p className='text-base font-extralight '>Promised 4-7 days delivery</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <img className='rounded-full w-20 border-4 border-black p-1' src={logo2} alt="" />
            <div>
              <h4 className='text-2xl font-semibold'>Secure Payments</h4>
              <p className='text-base font-extralight '>Make payments securely via stripe, paypal or razorpay</p>
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <img className='rounded-full w-20 border-4 border-black p-1' src={logo3} alt="" />
            <div>
              <h4 className='text-2xl font-semibold'>Easy Returns</h4>
              <p className='text-base font-extralight '>14 days easy return policy
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
