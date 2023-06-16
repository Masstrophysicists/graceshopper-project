import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleItem = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const userId = useSelector((state) => state.auth.me.id);

  const addToCart = async () => {
    try {
      const { data } = await axios.post(`/api/orders/${userId}`, {
        itemId: 1,
        quantity: 1,
      });
      console.log("Added to cart:", data);
    } catch (error) {
      console.log("Error adding to cart", error);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/items/${itemId}`
      );
      setItem(response.data);
    };

    fetchItems();
  }, [itemId]);

  if (!item) return null;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Single Item View
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{item.name}</h1>
        <img
          src={item.imageUrl}
          className="w-64 h-64 object-cover mb-4"
          alt={item.name}
        />
        <p className="text-gray-600 mb-4">{item.description}</p>
        <p className="text-2xl font-bold text-blue-500 mb-4">${item.price}</p>
        <button
          onClick={addToCart}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default SingleItem;
