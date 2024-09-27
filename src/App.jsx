
import './App.css'
import Slider from './Components/Slider/Slider'

import Marquee from "react-fast-marquee";
import LandingCattegories from './Components/LandingCattegories/LandingCattegories';
import FeatureProducts from './Components/Featured/FeatureProducts';
import logo1 from './assets/logo/free.png'
import logo2 from './assets/logo/pay.png'
import logo3 from './assets/logo/return.png'
import TodaysDeals from './Components/Today\'sdeals/TodaysDeals';
import img from './assets/comingSoon.png' 
import Newsletter from './Components/Newsletter/Newsletter';
import TrendingProducts from './Components/TrendingProducts/TrendingProducts';
function App() {

  return (
    <div className=''>
      <Slider></Slider>
      <div className='w-full  bg-[#8567e6]'>
        <Marquee className='py-1 lg:mt-2'>
          <div className='flex text-with-outline'>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
            <h3 className='mr-32 lg:text-2xl'>Buy 2 Hoodies & Get 1 Free <span className='text-sm text-red-400'>only on fabyoh</span></h3>
          </div>
        </Marquee>
      </div>
      <div className="container mx-auto mt-5 lg:mt-20">
        <LandingCattegories />
        <h3 className="text-4xl  mb-10 font-semibold text-center">Feature Products</h3>
        <div className='mb-20'>
          <FeatureProducts></FeatureProducts>
        </div>
      </div>
      {/*  */}
      <div className='border-y-2  my-10'>
        <div className="container mx-auto  justify-evenly py-5 flex lg:flex-row flex-col items-center w-2/3 gap-2">
          <div className='flex  items-center gap-3'>
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
      {/*  */}

      <div className='lg:min-h-[500px] min-h-44 bg-cover container mx-auto bg-no-repeat bg-center mb-20 bg-[url("https://www.orchardtaunton.co.uk/app/uploads/2020/03/OSC-Spring-Generic-2020-Website-Fashion-Banner-01.jpg")]'></div>
      <h3 className="container mx-auto text-4xl  mb-10 font-semibold ">{"Today's Deal"}</h3>
      <TodaysDeals />
      <div>
        <img className='object-cover bg-cover mx-auto lg:h-1/2' src={img} alt="" />
      </div>
      <Newsletter></Newsletter>
      <TrendingProducts></TrendingProducts>
    </div>
  )
}

export default App
