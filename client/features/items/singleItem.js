import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleItem = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  const addToCart = async () => {
    // We'll need to update this to get the order id from the URL.
    const orderId = 1;

    // The request body could include other information, like the quantity.
    await axios.post(
      `http://localhost:8080/api/orders/${orderId}/items`,
      {
        itemId,
        qty: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
