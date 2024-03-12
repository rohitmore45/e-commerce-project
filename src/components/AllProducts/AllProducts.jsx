import React, { useEffect, useState } from "react";
import axios from "axios";
import productsImg from "../../assets/allProducts.jpg";

export default function AllProducts({ handleAddToCart }) {
  const [allProducts, setAllProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const [selectProducts, setSelectProducts] = useState("");
  const [userSearchText, setUserSearchText] = useState("");

  const [searchItem, setSearchItem] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  //all products
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios("https://dummyjson.com/products");
        setAllProducts(res.data.products);
        setOriginalProducts(res.data.products);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProducts();
  }, []);

  // products category
  useEffect(() => {
    const getCategoryProducts = async () => {
      try {
        const res = await axios(`https://dummyjson.com/products/categories`);
        setAllCategory(res.data);
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoryProducts();
  }, []);

  //handle category change
  const handleCategoryChange = (e) => {
    console.log(e.target.value);
    setSelectProducts(e.target.value);
  };

  // filter products
  const filterProducts = async () => {
    try {
      const res =
        selectProducts !== "" &&
        (await axios(
          `https://dummyjson.com/products/category/${selectProducts}`
        ));
      setAllProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    filterProducts();
  }, [selectProducts]);

  //search button function
  const handleSearchByButton = () => {
    const searchProducts = originalProducts.filter((item) =>
      item.title.toLowerCase().includes(userSearchText.toLocaleLowerCase())
    );
    setAllProducts(searchProducts);
  };
  useEffect(() => {
    !userSearchText && setAllProducts(originalProducts);
  }, [userSearchText]);

  //price sorting
  const handlePriceSort = () => {
    let min = parseInt(minPrice);
    let max = parseInt(maxPrice);

    const sortedProducts = originalProducts.filter((item) => {
      return (!min || item.price >= min) && (!max || item.price <= max);
    });
    setAllProducts(sortedProducts);
  };
  return (
    <>
      <div className="relative mt-6 ">
        <img
          src={productsImg}
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

        {/* search Products */}
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search products"
            className="border-2 py-1 px-2 rounded-md text-sm md:text-xl"
            onChange={(e) => setUserSearchText(e.target.value)}
            value={userSearchText}
          />
          <button
            className=" bg-indigo-500 px-3 py-1 md:py-2 rounded-md ml-2 font-semibold"
            onClick={handleSearchByButton}
          >
            Search
          </button>
        </div>

        {/* sort products */}
        <div className="flex items-center justify-center gap-2">
          <input
            type="text"
            placeholder="min-price"
            className="border-2 py-1 px-2 w-[150px] rounded-md text-sm md:text-xl "
            onChange={(e) => setMinPrice(e.target.value)}
            value={minPrice}
          />
          <input
            type="text"
            placeholder="max-price"
            className="border-2 py-1 px-2 w-[150px] rounded-md text-sm md:text-xl "
            onChange={(e) => setMaxPrice(e.target.value)}
            value={maxPrice}
          />
          <button
            className=" bg-indigo-500 px-3 py-1 md:py-2 rounded-md ml-2 font-semibold"
            onClick={handlePriceSort}
          >
            Search
          </button>
        </div>
        <div className="flex flex-wrap justify-center sm:-m-4  -mt-4  gap-3  ">
          {allProducts.map((item) => {
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
                  <button
                    className=" bg-indigo-400 mt-2 px-2 py-1 rounded-sm"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
