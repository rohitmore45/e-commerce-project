import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";
import allProducts from "../../assets/allProducts.jpg";
export default function AllProducts() {
  const [allCategory, setAllCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  //product categories
  useEffect(() => {
    const getAllProductsCategories = async () => {
      try {
        const res = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        res.data.unshift("All");
        // console.log(res.data)
        setAllCategory(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProductsCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const getAllProducts = async () => {
    try {
      const res = await axios("https://dummyjson.com/products");
      setProducts(res.data.products);
      console.log(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategoryProducts = async () => {
    if (selectedCategory === "All") {
      getAllProducts();
    } else {
      try {
        const res = await axios(
          `https://dummyjson.com/products/category/${selectedCategory}`
        );
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCategoryProducts();
  }, [selectedCategory]);

  return (
    <>
      <Layout>
        <div className="relative mt-6 ">
          <img
            src={allProducts}
            alt="Img"
            className="object-cover object-center w-full h-[300px]"
          />
          <div className="w-full h-[300px] bg-black absolute top-0 left-0 opacity-[.4]"></div>
          <h2 className="absolute top-[40%] left-[10%] text-white font-semibold text-2xl md:text-4xl">
            All Products
          </h2>
        </div>
        <div className=" flex w-full flex-col gap-y-10 mb-10">
          <div className="mx-auto mt-5">
            <select
              className="border rounded-md p-1 bg-slate-200 text-1xl font-semibold cursor-pointer"
              onChange={handleCategoryChange}
            >
              <option>Filter by Category</option>
              {allCategory.map((category, ind) => {
                return (
                  <option key={ind} value={category}>
                    {category.toUpperCase()}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-wrap justify-center sm:-m-4  -mt-4  gap-3  ">
            {products.map((item) => {
              return (
                <div
                  className="md:w-1/4 sm:mb-0 mb-6 border-2 rounded-lg p-2 m-2 shadow-md"
                  key={item.id}
                >
                  <div className="rounded-lg ">
                    <img
                      alt="content"
                      className="object-fill w-80 mx-auto h-60"
                      src={item.thumbnail}
                    />
                  </div>
                  <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                    {item.title}
                  </h2>
                  <div className="flex gap-x-3 items-center font-semibold ">
                    <p className="text-xl md:text-2xl leading-relaxed mt-2 ">
                      ₹{item.price}
                    </p>
                    <p className="  leading-relaxed mt-2 font-lighter text-green-600">
                      Discount: {item.discountPercentage}%
                    </p>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <a className="text-indigo-600  mt-3 cursor-pointer">
                      View Details
                    </a>
                    <button className=" bg-indigo-400 mt-2 px-2 py-1 rounded-sm">
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
}
