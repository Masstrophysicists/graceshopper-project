import React from "react";
import CartProduct from "./CartProduct";
import { useSelector } from "react-redux";
function Cart() {
  const cart = useSelector((state) => state.auth.me.cart);
  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <CartProduct productId={item.productId} quantity={item.quantity} />
        ))}
      </div>
      <div className="cart-info">
        <div className="cart-total">Total: $100</div>
        <button>Checkout</button>
      </div>
    </div>
  );
}
export default Cart;
