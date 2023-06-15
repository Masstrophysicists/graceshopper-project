import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Order = () => {
  // Will need to update this to get the order id from the URL.
  const orderId = 1;
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    const fetchOrderItems = async () => {
      const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
      setOrderItems(response.data);
    };

    fetchOrderItems();
  }, []);

  return (
    <div>
      <h1>Your order</h1>
      {orderItems.map(orderItem => (
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





