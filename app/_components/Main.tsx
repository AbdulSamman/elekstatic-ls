"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import Image from "next/image";

function Main() {
  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      modules={[Pagination]}>
      <SwiperSlide>
        <div className="h-[600px] bg-blue-500 flex items-center justify-end text-white text-2xl">
          <video
            src="/media.mp4"
            autoPlay
            loop
            playsInline
            className="w-full"
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-[600px] bg-red-500 flex items-center justify-center text-white text-2xl w-full">
          <p className="text-2xl p-2 text-center w-3xl ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima eum
            obcaecati consectetur eveniet veritatis recusandae iste unde tempora
            libero quod sed architecto, officia corrupti facere natus!
            Laudantium totam tenetur atque?
          </p>
          <div className="pt-8">
            <Image
              src="/produc-1.png"
              loading="eager"
              alt="produc-1"
              width={320}
              height={100}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-[600px] bg-blue-500 flex items-center justify-end text-white text-2xl">
          <p className="text-2xl p-2 text-center w-3xl ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima eum
            obcaecati consectetur eveniet veritatis recusandae iste unde tempora
            libero quod sed architecto, officia corrupti facere natus!
            Laudantium totam tenetur atque?
          </p>
          <div className="pt-8">
            <Image
              src="/produc-2.png"
              loading="eager"
              alt="produc-2"
              width={250}
              height={100}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-[600px] bg-green-500 flex items-center justify-end text-white text-2xl">
          <p className="text-2xl p-2 text-center w-3xl ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima eum
            obcaecati consectetur eveniet veritatis recusandae iste unde tempora
            libero quod sed architecto, officia corrupti facere natus!
            Laudantium totam tenetur atque?
          </p>
          <div className="pt-8">
            <Image
              src="/produc-3.png"
              loading="eager"
              alt="produc-1"
              width={250}
              height={100}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Main;
