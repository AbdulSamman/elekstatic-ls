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
        <div className="flex items-center justify-end text-white text-2xl">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center not-[]:">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-5xl">
              Understand user flow and
              <strong className="text-yellow-600"> increase </strong>
              conversions
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
              nisi. Natus, provident accusamus impedit minima harum corporis
              iusto.
            </p>

            <div className="mt-4 flex gap-4 sm:mt-6">
              <a
                className="inline-block rounded border border-yellow-600 bg-primary px-5 py-3 font-medium text-yellow-600 shadow-sm transition-colors hover:bg-yellow-700"
                href="#">
                Get Started
              </a>

              <a
                className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-yellow-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-yellow-900"
                href="#">
                Learn More
              </a>
            </div>
          </div>
          <div>
            <video
              src="/media.mp4"
              autoPlay={true}
              loop
              playsInline
              className="w-screen h-screen object-cover"
            />
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-screen sm:flex-row bg-red-500 flex flex-col items-center justify-around text-white text-2xl">
          <div className="pt-8">
            <Image
              src="/produc-1.png"
              loading="eager"
              alt="produc-1"
              width={320}
              height={320}
              className="object-contain"
              priority
            />
          </div>
          <p className="text-2xl p-2 text-center sm:w-4xl ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima eum
            obcaecati consectetur eveniet veritatis recusandae iste unde tempora
            libero quod sed architecto, officia corrupti facere natus!
            Laudantium totam tenetur atque?
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className=" h-screen bg-blue-500 flex flex-col sm:flex-row items-center justify-around text-white text-2xl">
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
          <p className="text-2xl p-2 text-center sm:w-4xl ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima eum
            obcaecati consectetur eveniet veritatis recusandae iste unde tempora
            libero quod sed architecto, officia corrupti facere natus!
            Laudantium totam tenetur atque?
          </p>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-screen sm:flex-row bg-green-500 flex flex-col items-center justify-around text-white text-2xl">
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
          <p className="text-2xl p-2 text-center sm:w-4xl ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima eum
            obcaecati consectetur eveniet veritatis recusandae iste unde tempora
            libero quod sed architecto, officia corrupti facere natus!
            Laudantium totam tenetur atque?
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Main;
