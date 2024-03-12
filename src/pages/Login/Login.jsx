import React, { useState } from "react";
import loginImg from "../../assets/Login/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseAuth/FirebaseAuth";

export default function Login() {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const navigateHome = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  //handle Login function
  const handleLogin = (e) => {
    e.preventDefault();
    if (!userLogin.email || !userLogin.password) {
      return toast.error("All field required !!");
    } else {
      signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)
        .then(() => {
          navigateHome("/");
          toast.success("Logged In Successfully!");
        })
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <>
      <>
        <div>
          <div className="relative mt-6">
            <img
              src={loginImg}
              alt="Img"
              className="object-cover w-full object-center h-[200px]"
            />
            <div className="w-full h-[200px] bg-black absolute top-0 left-0 opacity-[.4]"></div>
            <h2 className="absolute top-[40%] left-[10%] text-white font-semibold text-2xl md:text-4xl">
              Login
            </h2>
          </div>

          {/* login form */}
          <div className=" px-5 py-20 mx-auto flex bg-gray-200 w-full">
            <div className="  mx-auto bg-white rounded-lg p-10 flex flex-col relative  z-0 shadow-lg w-[500px]">
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                Login
              </h2>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userLogin.email}
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
                  value={userLogin.password}
                  autoComplete="off"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  onChange={handleChange}
                />
              </div>
              <button
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={handleLogin}
              >
                Login
              </button>
              <p className="text-xs text-gray-500 mt-3">
                Don't have account?{" "}
                <Link to="/signup">
                  <button className="text-[blue] hover:font-semibold">
                    Sign up
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
