import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Cart({
  cartData,
  handleQuantityDecrease,
  handleQuantityIncrease,
  handleRemoveItem,
  getTotalPrice,
  applyPromoCode,
  promoCode,
  setPromoCode,
  invalidCode,
  promoApplied,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-[90%] mx-auto">
        <div className="container mx-auto mt-10">
          <div className="flex flex-col md:flex-row shadow-md my-10">
            <div className=" w-full lg:w-3/4 bg-white px-10 py-10">
              <div className="flex  justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">
                  {cartData.length} ITEMS
                </h2>
              </div>
              <div className="flex flex-row  md:flex-row mt-5 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs  uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                  Quantity
                </h3>
                <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                  Price
                </h3>
                <h3 className="font-semibold  text-gray-600 text-xs uppercase w-1/5 text-center">
                  Total
                </h3>
              </div>
              {cartData.length === 0 && (
                <div className=" text-center text-2xl text-red-500 font-semibold">
                  <h2>Cart is Empty!</h2>
                </div>
              )}
              {cartData.map((item) => {
                return (
                  <div
                    className="flex items-center flex-wrap md:flex-nowrap  hover:bg-gray-100 -mx-8 px-6 py-5"
                    key={item.id}
                  >
                    <div className="flex md:w-2/5 w-1/1 flex-wrap">
                      {/* <!-- product --> */}
                      <div className="w-20">
                        <img
                          className=" h-[80px] w-full"
                          src={item.thumbnail}
                          alt="Product_Img"
                        />
                      </div>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">{item.title}</span>
                        <span className="text-red-500 text-xs">
                          {item.brand}
                        </span>
                        <p
                          className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center md:w-1/5 mt-2 md:mt-0 ">
                      <svg
                        className="fill-current text-gray-600 w-3 cursor-pointer"
                        viewBox="0 0 448 512"
                        onClick={() => handleQuantityDecrease(item.id)}
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>

                      <input
                        className="mx-2 border text-center w-8"
                        type="text"
                        value={item.quantity}
                        readOnly
                      />

                      <svg
                        className="fill-current text-gray-600 w-3 cursor-pointer mr-2"
                        viewBox="0 0 448 512"
                        onClick={() => handleQuantityIncrease(item.id)}
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm mt-2 md:mt-0">
                      ₹ {item.price}
                    </span>
                    <span className="text-center w-1/3 font-semibold text-sm mt-2 md:mt-0">
                      ₹ {item.price * item.quantity}
                    </span>
                  </div>
                );
              })}

              <p
                className="flex font-semibold text-indigo-600 text-sm mt-10 cursor-pointer"
                onClick={() => navigate("/allproducts")}
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Shopping
              </p>
            </div>

            <div
              id="summary"
              className=" w-full lg:w-1/4 px-8 py-10 bg-[#f6f6f6]"
            >
              <h1 className="font-semibold text-2xl border-b pb-8">
                Order Summary
              </h1>
              <div className="flex justify-between mt-10 mb-5">
                <span className="font-semibold text-sm uppercase">
                  ITEMS {cartData.length}
                </span>
                <span className="font-semibold text-sm">
                  {getTotalPrice()} ₹
                </span>
              </div>
              <div>
                <label className="font-medium inline-block mb-3 text-sm uppercase">
                  Shipping
                </label>
                <select className="block p-2 text-gray-600 w-full text-sm">
                  <option>Standard shipping - 10.00 ₹</option>
                </select>
              </div>
              <div className="py-10">
                <label
                  htmlFor="promo"
                  className="font-semibold inline-block mb-3 text-sm uppercase"
                >
                  Promo Code
                </label>
                <input
                  type="text"
                  id="promo"
                  placeholder="Enter your code"
                  className="p-2 text-sm w-full"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                {promoCode && promoCode !== "DISCOUNT10" ? (
                  <p className="mt-2 text-red-700 font-semibold">
                    {invalidCode}
                  </p>
                ) : (
                  !promoApplied && (
                    <p className="mt-2  font-semibold">
                      Use Code : "DISCOUNT10"
                    </p>
                  )
                )}
                {
                  <p className="mt-2 text-green-700 font-semibold">
                    {promoApplied}
                  </p>
                }
              </div>
              <button
                className="bg-green-700 hover:bg-green-600 px-5 py-2 text-white text-sm uppercase font-semibold rounded-md"
                onClick={applyPromoCode}
              >
                Apply
              </button>
              <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                  <span>Total cost</span>
                  <span>
                    {cartData.length > 0 ? getTotalPrice() + 10 : 0} ₹
                  </span>
                </div>
                <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded-lg">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
