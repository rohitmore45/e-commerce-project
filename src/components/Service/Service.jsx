import React from "react";
import { MdLocalShipping } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
export default function Service() {
  return (
    <>
      <div className="container mx-auto px-5 flex mt-16 gap-10 items-center justify-center flex-wrap ">
        <div className=" bg-yellow-300 py-3 px-5 rounded  flex gap-2 flex-col items-center font-medium  w-[220px] hover:scale-110 transition duration-500">
          <MdLocalShipping size={30} />
          <p>FREE SHIPPING </p>
        </div>
        <div className=" bg-yellow-300 py-3 px-5 rounded flex gap-2 flex-col items-center font-medium w-[255px] hover:scale-110 transition duration-500">
          <MdOutlineProductionQuantityLimits size={30} />
          <p>AUTHENTIC PRODUCT </p>
        </div>
        <div className=" bg-yellow-300 py-3 px-5 rounded  flex gap-2 flex-col items-center font-medium w-[220px] hover:scale-110 transition duration-500">
          <TbTruckReturn size={30} />
          <p>EASY RETURNS </p>
        </div>
        <div className=" bg-yellow-300 py-3 px-5 rounded  flex gap-2 flex-col items-center font-medium w-[220px] hover:scale-110 transition duration-500">
          <RiSecurePaymentFill size={30} />
          <p>SECURE PAYMENT </p>
        </div>
      </div>
    </>
  );
}
