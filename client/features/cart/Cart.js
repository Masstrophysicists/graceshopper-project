import React, { useEffect, useState } from "react";
import CartProduct from "./CartProduct";
import { useSelector, useDispatch } from "react-redux";
import PaymentInfo from "./PaymentInfo";
import { me } from "../auth/authSlice";
import axios from "axios";

function Cart() {
  const user = useSelector((state) => state.auth.me);
  const userId = user.id;
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartItems = async () => {
      const response = await axios.get(`/api/cart/${userId}`);
      setCartItems(response.data);
    };

    fetchCartItems();
  }, [userId, user]);

  async function createOrders() {
    fetch(`api/cart/empty/${userId}`, {
      headers: { authorization: localStorage.token },
    }).then(dispatch(me()));
    setCartItems([]);
    setCheckoutSuccess(true);
    setTotal(0);
    setTimeout(() => setCheckoutSuccess(false), 4000);
  }

  return (
    <div className="cart container mx-auto mt-8 flex flex-col min-h-screen">
      {" "}
      {/* Added flex flex-col and min-h-screen */}
      <h2 className="text-4xl font-bold text-center text-shadow text-white mb-10 px-10">
        Cart
      </h2>
      <div className="cart-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start justify-center">
        {cartItems.map((item) => (
          <CartProduct
            key={item.itemId}
            productId={item.itemId}
            quantity={item.quantity}
            setTotal={setTotal}
          />
        ))}
      </div>
      <PaymentInfo />
      <div className="cart-info flex justify-center items-center mt-8 mb-8">
        <div className="cart-total text-2xl font-bold text-gray-800">
          Total: ${total}
        </div>
        <button
          onClick={createOrders}
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 ml-4"
        >
          Checkout
        </button>
        {checkoutSuccess && (
          <div className="ml-4 text-green-500 font-bold text-xl">
            Successful Checkout!
          </div>
        )}
      </div>
      <footer className="mt-auto"> </footer>
    </div>
  );
}

export default Cart;
