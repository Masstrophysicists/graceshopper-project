import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { me } from "../auth/authSlice";

function CartProduct({ productId, quantity: initQuantity, setTotal }) {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(initQuantity);
  const dispatch = useDispatch();

  async function getProduct() {
    const res = await fetch("/api/items/" + productId);
    const data = await res.json();
    setTotal((total) => total + data.price * quantity);
    setProduct(data);
  }

  useEffect(() => {
    getProduct();
  }, []);

  async function increase() {
    await fetch("/api/cart/add/" + productId, {
      headers: { authorization: localStorage.token },
    });
    setTotal((total) => total + product.price);
    setQuantity((prevQuantity) => quantity + 1);
    dispatch(me());
  }

  async function decrease() {
    await fetch("/api/cart/remove/" + productId, {
      headers: { authorization: localStorage.token },
    });
    setTotal((total) => total - product.price);
    setQuantity((prevQuantity) => quantity - 1);
    dispatch(me());
  }

  return (
    <div className="cart-product p-4 bg-white shadow-lg rounded-lg transition-colors duration-500">
      <img
        src={product?.imageUrl}
        className="w-full h-48 object-cover mb-4"
        alt={product?.name}
      />
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
