"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";

function Main() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      modules={[Pagination]}>
      <SwiperSlide>
        <div className="h-150 bg-red-500 flex items-center justify-center text-white text-2xl">
          Slide 1
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-150 bg-blue-500 flex items-center justify-center text-white text-2xl">
          Slide 2
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-150 bg-green-500 flex items-center justify-center text-white text-2xl">
          Slide 3
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Main;
