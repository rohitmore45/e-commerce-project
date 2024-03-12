import "./App.css";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllProducts from "./components/AllProducts/AllProducts";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseAuth/FirebaseAuth";
function App() {
  const [cartData, setCartData] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [invalidCode, setInvalidCode] = useState("Invalid Promo Code!");
  const [promoApplied, setPromoApplied] = useState("");
  const [userName, setUserName] = useState("");

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

  //totalProductPrice function
  const getTotalPrice = () => {
    const totalPrice = cartData.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    return totalPrice - discount;
    f;
  };

  //promo code functions
  const applyPromoCode = () => {
    if (promoCode === "DISCOUNT10") {
      setDiscount(getTotalPrice() * 0.1);
      setPromoCode("");
      setInvalidCode("");
      setPromoApplied("Code Applied Successfully !!");
    } else {
      setInvalidCode(invalidCode);
    }
  };

  //display username
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      } else {
        setUserName("");
      }
    });
  }, [userName]);

  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar cartData={cartData} userName={userName} />
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
                  getTotalPrice={getTotalPrice}
                  applyPromoCode={applyPromoCode}
                  promoCode={promoCode}
                  setPromoCode={setPromoCode}
                  invalidCode={invalidCode}
                  promoApplied={promoApplied}
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
          <Toaster />
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
