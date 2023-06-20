import React, { useState } from "react";
import CartProduct from "./CartProduct";
import { useSelector, useDispatch } from "react-redux";
import PaymentInfo from "./PaymentInfo";
import { me } from "../auth/authSlice";
function Cart() {
  const user = useSelector((state) => state.auth.me);
  const cart = user.cart;
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();

  async function createOrders() {
    fetch("/api/cart/empty", {
      headers: { authorization: localStorage.token },
    }).then(dispatch(me()));
    // cart.forEach((product) => {

    //   fetch("/api/orders/" + user.id, {
    //     method: "POST",
    //     body: JSON.stringify({
    //       itemId: product.productId,
    //       quantity: product.quantity,
    //     }),
    //     headers: { "Content-Type": "application/json" },
    //   });
    // });
  }
  return (
    <div className="cart">
      <h2>Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <CartProduct
            productId={item.productId}
            quantity={item.quantity}
            setTotal={setTotal}
          />
        ))}
      </div>
      <div className="cart-info">
        <PaymentInfo />
        <div className="cart-total">Total: ${total}</div>
        <button onClick={createOrders}>Checkout</button>
      </div>
    </div>
  );
}
export default Cart;
