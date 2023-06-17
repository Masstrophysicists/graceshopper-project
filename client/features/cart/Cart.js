import React from "react";
import { useSelector } from "react-redux";
function Cart() {
  const cart = useSelector((state) => state.auth.me.cart);
  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items"></div>
      <div className="cart-info">
        <div className="cart-total">Total: $100</div>
        <button>Checkout</button>
      </div>
    </div>
  );
}
export default Cart;
