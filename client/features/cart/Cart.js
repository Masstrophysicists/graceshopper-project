import React, { useState, useEffect, useContext } from "react";
import CartProduct from "./CartProduct";
import { useSelector } from "react-redux";
import { CartContext } from "./CartContext";

function Cart() {
  const [total, setTotal] = useState(0);
  const cart = useSelector((state) => state.auth.me.cart);

  useEffect(() => {
    let newTotal = 0;
    cart.forEach((item) => {
      if (item.product) {
        newTotal += item.product.price * item.quantity;
      }
    });
    setTotal(newTotal);
  }, [cart]);

  return (
    <CartContext.Provider value={{ total, setTotal }}>
      <div className="cart container mx-auto mt-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Cart
        </h2>
        <div className="cart-items grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cart.map((item) => (
            <CartProduct
              key={item.productId}
              productId={item.productId}
              quantity={item.quantity}
            />
          ))}
        </div>
        <div className="cart-info">
          <div className="cart-total">Total: {total}</div>
          <button className="px-4 py-2 rounded bg-blue-500 text-white">
            Checkout
          </button>
        </div>
      </div>
    </CartContext.Provider>
  );
}

export default Cart;
