import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { me } from "../auth/authSlice";

function CartProduct({ productId, quantity }) {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  async function getProduct() {
    const res = await fetch("/api/items/" + productId);

    setProduct(await res.json());
  }

  useEffect(() => {
    getProduct();
  }, []);

  async function increase() {
    await fetch("/api/cart/add/" + productId, {
      headers: { authorization: localStorage.token },
    });
    dispatch(me());
  }

  async function decrease() {
    await fetch("/api/cart/remove/" + productId, {
      headers: { authorization: localStorage.token },
    });
    dispatch(me());
  }
  return (
    <div className="cart-product">
      <img src={product?.imageUrl}></img>
      <div className="cart-product-info">
        <h2>{product?.name}</h2>
        <p>{product?.description}</p>
        <h3>${product?.price}</h3>
        <div className="cart-item-quantity">
          <button onClick={increase}>-</button>
          <p>{quantity}</p>
          <button onClick={decrease}>+</button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
