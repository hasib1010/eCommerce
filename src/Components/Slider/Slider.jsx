import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules'; // Import Autoplay
import slide1 from "../../assets/1.webp";
import slide2 from "../../assets/2.webp";
import slide3 from "../../assets/3.webp";
import { Link } from 'react-router-dom';

const Slider = () => {
    return (
        <div className=' '>
            <Swiper
                cssMode={true}
                navigation={true}
                pagination={{ clickable: true }}
                mousewheel={true}
                keyboard={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                loopFillGroupWithBlank={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div
                        className="relative bg-cover"
                        style={{ backgroundImage: `url(${slide1})` }} // Use inline style for background image
                    >
                        <div className='  z-50   min-h-screen justify-center flex flex-col items-center gap-5'>
                            <h4 className='text-5xl font-bold text-black'>Spring Sale</h4>
                            <p className='text-xl font-medium text-black'>Don't miss this opportunity.</p>
                            <Link className='bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-3 py-5 text-3xl font-extrabold rounded-xl'>
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="relative bg-cover"
                        style={{ backgroundImage: `url(${slide2})` }} // Use inline style for background image
                    >
                        <div className='gap-5 z-50 flex flex-col min-h-screen justify-center items-center'>
                            <h4 className='text-5xl font-bold text-white'>Find Your Style</h4>
                            <p className='text-xl font-medium text-white'>Order for the latest Trends</p>
                            <Link className='bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-3 py-5 text-3xl font-extrabold rounded-xl'>
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="relative bg-cover h-full"
                        style={{ backgroundImage: `url(${slide3})` }} // Use inline style for background image
                    >
                        <div className=' flex flex-col min-h-screen justify-center items-center gap-5'>
                            <h4 className='text-5xl font-bold text-black'>Spring Sale</h4>
                            <p className='text-xl font-medium text-black'>Don't miss this opportunity.</p>
                            <Link className='bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-3 py-5 text-3xl font-extrabold rounded-xl'>
                                Shop Now
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Slider;
