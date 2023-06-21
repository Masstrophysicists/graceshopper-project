import React, { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { useSelector, useDispatch } from "react-redux";
import PaymentInfo from "./PaymentInfo";
import { me } from "../auth/authSlice";
import axios from "axios";

function Cart() {
  const user = useSelector((state) => state.auth.me);

  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await axios.get("http://localhost:8080/api/cart");
      setCartItems(response.data);
      console.log("looky here", response.data);
    };

    fetchCartItems();
  }, []);

  console.log("THIS IS OUR USER:", user);
  console.log("THIS IS OUR CART SO FAAAR:", cartItems);

  async function createOrders() {
    fetch("/api/cart/empty", {
      headers: { authorization: localStorage.token },
    }).then(dispatch(me()));
  }

  return (
    <div className="cart container mx-auto mt-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Cart
      </h2>
      <div className="cart-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cartItems.map((item) => (
          <CartProduct
            key={item.productId}
            productId={item.productId}
            quantity={item.quantity}
            setTotal={setTotal}
          />
        ))}
      </div>
      <PaymentInfo />
      <div className="cart-info flex justify-between items-center mt-8 mb-8">
        <div className="cart-total text-2xl font-bold text-gray-800">
          Total: ${total}
        </div>
        <button
          onClick={createOrders}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
