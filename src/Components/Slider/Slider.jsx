import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import slide1 from "../../assets/1.webp";
import slide2 from "../../assets/2.webp";
import slide3 from "../../assets/3.webp";
import { Link } from 'react-router-dom';

const Slider = () => {
    const handleSliderClick = (event) => {
        event.stopPropagation(); // Prevent click from bubbling up
    };

    return (
        <div className='relative' onClick={handleSliderClick}>
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
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                className="mySwiper"
            >
                {[slide1, slide2, slide3].map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative lg:bg-cover bg-center bg-cover lg:h-full" style={{ backgroundImage: `url(${slide})` }}>
                            <div className='z-30 lg:min-h-screen py-20 flex flex-col justify-center items-center gap-5 text-center'>
                                <h4 className='lg:text-5xl text-xl z-30 font-semibold text-white'>Spring Sale</h4>
                                <p className='lg:text-xl z-30 font-semibold text-white'>Don't miss this opportunity.</p>
                                <Link to={'/AllProducts'} className='bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white px-6 py-3 text-2xl font-extrabold rounded-xl z-30'>
                                    Shop Now
                                </Link>
                            </div>
                            <div className="absolute inset-0 bg-black opacity-50 z-20" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
export default Slider
