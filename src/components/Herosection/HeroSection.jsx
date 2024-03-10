import React from "react";
import banner from "../../assets/banner.jpg";

export default function HeroSection() {
  return (
    <div className="relative">
      <div>
        <img src={banner} alt="Banner_Img" />
      </div>
      <div className=" absolute top-[15%] left-[5%]">
        <h1 className=" text-5xl text-red-700  font-bold font-serif">
          Discover Your Adventure
        </h1>
        <p className="text-center text-1xl font-semibold mt-3">
          Shop Our Latest Arrival & Unleash Your Style
        </p>
      </div>
    </div>
  );
}
