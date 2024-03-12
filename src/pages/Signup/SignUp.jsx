import React, { useState } from "react";
import loginImg from "../../assets/Login/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../FirebaseAuth/FirebaseAuth";

export default function SignUp() {
  const [userSignUp, setUserSignUp] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigateLogin = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserSignUp({ ...userSignUp, [name]: value });
  };

  //handle signup function
  const handleSignUp = (e) => {
    e.preventDefault();
    if (!userSignUp.username || !userSignUp.email || !userSignUp.password) {
      return toast.error("All field required !!");
    } else {
      createUserWithEmailAndPassword(
        auth,
        userSignUp.email,
        userSignUp.password
      )
        .then(async (res) => {
          const user = res.user;
          await updateProfile(user, {
            displayName: userSignUp.username,
          });
          toast.success("Account Created Successfully!");
          navigateLogin("/login");
        })
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <>
      {/* <div className="relative mt-6">
        <img
          src={loginImg}
          alt="Img"
          className="object-cover w-full object-center h-[200px]"
        />
        <div className="w-full h-[200px] bg-black absolute top-0 left-0 opacity-[.4] "></div>
        <h2 className="absolute top-[40%] left-[10%] text-white font-semibold text-2xl md:text-4xl">
          Sign Up
        </h2>
      </div> */}
      <div className=" px-5 py-20 mx-auto flex bg-gray-200 w-full">
        <div className="  mx-auto bg-white rounded-lg p-10 flex flex-col relative  z-0 shadow-lg w-[500px]">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
            Sign Up
          </h2>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="username"
              value={userSignUp.username}
              autoComplete="off"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={handleChange}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userSignUp.email}
              autoComplete="off"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={handleChange}
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={userSignUp.password}
              autoComplete="off"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={handleChange}
            />
          </div>
          <button
            className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Already have an account?{" "}
            <Link to="/login">
              <button className="text-[blue] hover:font-semibold">Login</button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
