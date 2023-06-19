import React, { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { me } from "../auth/authSlice";
import { CartContext } from "./CartContext";

function CartProduct({ productId, quantity }) {
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const { total, setTotal } = useContext(CartContext);

  async function getProduct() {
    const res = await fetch("/api/items/" + productId);

    setProduct(await res.json());
  }

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (product.price) {
      setTotal(total + product.price * quantity);
    }
  }, [product, quantity]);

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
    <div className="cart-product p-4 bg-white shadow-lg rounded-lg hover:bg-blue-500 transition-colors duration-500">
      <img
        src={product?.imageUrl}
        className="w-full h-48 object-cover mb-4"
        alt={product?.name}
      ></img>
      <div className="cart-product-info text-center">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          {product?.name}
        </h2>
        <p className="mb-2">{product?.description}</p>
        <h3 className="font-bold text-blue-500 mb-2">${product?.price}</h3>
        <div className="cart-item-quantity flex justify-center space-x-4">
          <button
            onClick={decrease}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-white hover:text-black"
          >
            -
          </button>
          <p>{quantity}</p>
          <button
            onClick={increase}
            className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-white hover:text-black"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;
