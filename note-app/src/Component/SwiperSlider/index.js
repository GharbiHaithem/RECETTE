import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';
import img1 from '../../images/croi.jpg'
import img2 from '../../images/patiss1.jpg'
import img3 from '../../images/patiss2.jpg'
import img4 from '../../images/top-mobile.jpg'
 
const SwiperSlider = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return (
        <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide><img src={img1} alt=''  style={{height:'500px' , objectFit:'cover'}} /></SwiperSlide>
        <SwiperSlide><img src={img2} alt=''   style={{height:'500px' , objectFit:'cover'}} /></SwiperSlide>
        <SwiperSlide><img src={img3} alt=''   style={{height:'500px' , objectFit:'cover'}} /></SwiperSlide>
        <SwiperSlide><img src={img4} alt=''  style={{height:'500px' , objectFit:'cover'}} /></SwiperSlide>
        
      
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
    )
}

export default SwiperSlider
