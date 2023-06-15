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
    <div>
      <h1>Single Item View</h1>
      <div>
        <h1>{item.name}</h1>
        <img src={item.imageUrl} />
        <p>{item.description}</p>
        <p>{item.price}</p>
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default SingleItem;
