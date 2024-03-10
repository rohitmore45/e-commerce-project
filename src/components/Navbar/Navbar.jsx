import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 relative">
      <div className="container mx-auto flex justify-between p-4 items-center">
        <div>
          <Link to="/">
            <h3 className="font-bold text-2xl">
              Shop<span className="text-red-700">Now</span>
            </h3>
          </Link>
        </div>

        <div className="hidden md:block">
          <ul className="flex  items-center text-lg justify-center font-semibold">
            <Link to="/">
              <li className="mr-5 hover:text-red-900 cursor-pointer">Home</li>
            </Link>
            <Link to="/allproducts">
              <li className="mr-5 hover:text-red-900 cursor-pointer">
                All Products
              </li>
            </Link>

            <li className="mr-5 hover:text-red-900 cursor-pointer">Mens</li>
            <li className="mr-5 hover:text-red-900 cursor-pointer">Kids</li>
          </ul>
        </div>
        {isOpen && (
          <div className="">
            <ul className="flex flex-col gap-10 absolute top-[71px] z-10 left-0 h-screen text-[white] w-full bg-red-400 items-center text-lg justify-center font-semibold">
              <Link to="/">
                <li className="mr-5 hover:text-red-900 cursor-pointer">Home</li>
              </Link>
              <li className="mr-5 hover:text-red-900 cursor-pointer">
                All Products
              </li>
              <li className="mr-5 hover:text-red-900 cursor-pointer">Mens</li>
              <li className="mr-5 hover:text-red-900 cursor-pointer">Kids</li>
            </ul>
            <button
              className="absolute  top-[71px] z-10 right-0 text-[white] py-2 px-4 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <RxCross2 size={30} />
            </button>
          </div>
        )}

        <div className="flex justify-center items-center gap-2">
          <Link to="/login">
            <button className="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200  rounded text-base  font-semibold">
              Login
            </button>
          </Link>
          <Link to="/cart">
            <button>
              <FaCartShopping size={25} />
            </button>
          </Link>
          {!isOpen && (
            <button className="md:hidden" onClick={() => setIsOpen(true)}>
              <GiHamburgerMenu size={25} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
