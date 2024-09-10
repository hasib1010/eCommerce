import { useState } from 'react'
import './App.css'
import Slider from './Components/Slider/Slider'

import Marquee from "react-fast-marquee";

function App() {

  return (
    <>
      <Slider></Slider>
      <div className='w-full  bg-[#8567e6]'>
        <Marquee className='py-1 mt-2'>
          <div className='flex text-with-outline'>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
            <h3 className='mr-32 text-2xl'>Buy 2 Hoodies & Get 1 Free</h3>
          </div>
        </Marquee>
      </div>

    </>
  )
}

export default App
