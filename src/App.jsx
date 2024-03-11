import "./App.css";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllProducts from "./components/AllProducts/AllProducts";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
function App() {
  const [cartData, setCartData] = useState([]);

  // addtocart function
  const handleAddToCart = (product) => {
    const isProductExist = cartData.find((item) => item.id === product.id);
    if (isProductExist) {
      const updatedCart = cartData.map((cartItem) => {
        return cartItem.id === product.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem;
      });
      setCartData(updatedCart);
    } else {
      setCartData([...cartData, { ...product, quantity: 1 }]);
    }
  };

  //decrease Quantity
  const handleQuantityDecrease = (id) => {
    const quantityDecrease = cartData.map((item) => {
      return item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item;
    });
    setCartData(quantityDecrease);
  };

  //increase Quantity
  const handleQuantityIncrease = (id) => {
    const quantityIncrease = cartData.map((item) => {
      return item.id === id ? { ...item, quantity: item.quantity + 1 } : item;
    });
    setCartData(quantityIncrease);
  };

  //remove item function
  const handleRemoveItem = (id) => {
    const filteredItems = cartData.filter((item) => item.id !== id);
    setCartData(filteredItems);
  };

  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar cartData={cartData} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/cart"
              element={
                <Cart
                  cartData={cartData}
                  handleQuantityDecrease={handleQuantityDecrease}
                  handleQuantityIncrease={handleQuantityIncrease}
                  handleRemoveItem={handleRemoveItem}
                />
              }
            />
            <Route
              exact
              path="/allproducts"
              element={<AllProducts handleAddToCart={handleAddToCart} />}
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
