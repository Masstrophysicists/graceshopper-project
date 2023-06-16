import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Order = () => {
  const userId = useSelector((state) => state.auth.me.id);
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      const { data } = await axios.get(`/api/orders/${userId}`);
      console.log("1 Order items:", data);
      setOrderItems(data.orderItems);
    };
    fetchOrderItems();
  }, [userId]);

  useEffect(() => {
    console.log("2 Order items:", orderItems);
  }, [orderItems]);

  return (
    <div>
      <h1>Your order</h1>
      {orderItems &&
        orderItems.map((orderItem) => (
          <div key={orderItem.id}>
            <h3>{orderItem.item.name}</h3>
            <img src={orderItem.item.imageUrl} alt={orderItem.item.name} />
            <p>{orderItem.item.description}</p>
            <p>{orderItem.item.price}</p>
            <p>Quantity: {orderItem.quantity}</p>
            <p>Total price: {orderItem.totalPrice}</p>
          </div>
        ))}
    </div>
  );
};

export default Order;
