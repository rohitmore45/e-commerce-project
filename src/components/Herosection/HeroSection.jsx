import React from "react";
import banner from "../../assets/banner.jpg";

export default function HeroSection() {
  return (
    <div className="relative">
      <div>
        <img
          src={banner}
          alt="Banner_Img"
          className=" h-auto w-auto object-cover"
        />
      </div>
      <div className=" absolute top-[15%] left-[5%]">
        <h1 className="text-1xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-red-700  font-bold font-serif">
          Discover Your Adventure
        </h1>
        <p className="text-[10px] lg:text-2xl mt-2 lg:mt-3 text-center text-1xl font-semibold ">
          Shop Our Latest Arrival & Unleash Your Style
        </p>
      </div>
    </div>
  );
}
