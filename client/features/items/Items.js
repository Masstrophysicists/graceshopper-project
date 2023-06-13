import React, { useEffect, useState } from "react";
import axios from "axios";

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("http://localhost:8080/api/items");
      setItems(response.data);
    };

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Items</h1>
      <div>
        {items.map((item) => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>{item.price}</p>
            <img src={item.imageUrl} />
          </div>
        ))}
      </div>
    </div>
  );
};


