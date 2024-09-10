import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules'; // Import Autoplay
import slide1 from  "../../assets/1.webp";
import slide2 from  "../../assets/2.webp";
import slide3 from  "../../assets/3.webp";

const Slider = () => {
    return (
        <div className='max-w-[2100px] mx-auto'>
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
                    <img className='w-fit mx-auto' src={slide1} alt="Slide 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-fit mx-auto' src={slide2} alt="Slide 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-fit mx-auto' src={slide3} alt="Slide 3" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Slider;
