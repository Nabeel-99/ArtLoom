"use client";

import React, { useRef } from "react";
import {
  Autoplay,
  EffectCards,
  EffectCoverflow,
  FreeMode,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import ArtCard from "../ArtCard";
import { GoArrowUpRight } from "react-icons/go";
import TiltedCard from "../TiltedCard";
import { artImages } from "@/lib/utils";

const Hero = () => {
  const swiperRef = useRef<SwiperType | null>(null);
  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };
  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };
  return (
    <section className="flex flex-col lg:px-10  gap-6 lg:flex-row justify-between  pt-10 lg:pt-20">
      <div className="flex flex-col justify-between lg:items-start gap-3 w-screen  pr-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl lg:text-7xl font-bold">
            Discover Unique Art For Your Space
          </h2>
          <p className="text-lg lg:text-xl font-medium">
            Handpicked paintings and digital art that bring warmth and
            personality. Crafted by independent artists to turn ordinary walls
            into lasting stories.
          </p>
        </div>
        <button className="bg-black cursor-pointer mt-10 p-4 lg:p-5 hover:bg-black/90 transition-all duration-300 ease-in-out  lg:text-2xl rounded-3xl flex items-center justify-center gap-2">
          <span className="shiny-text">Shop Now</span>
          <GoArrowUpRight className="text-white" />
        </button>
      </div>
      {/* large screen */}
      <div className="hidden lg:flex  lg:w-1/2 mask-x-from-60%    h-full">
        <Swiper
          slidesPerView={"auto"}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {[...artImages, ...artImages, ...artImages].map((image, index) => (
            <SwiperSlide className="">
              <TiltedCard
                showMobileWarning={false}
                rotateAmplitude={6}
                key={index}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                showTooltip={false}
              >
                {" "}
                <ArtCard image={image} />
              </TiltedCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* mobile screen */}
    </section>
  );
};

export default Hero;
