import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
            <Link to={`/items/${item.id}`}>
              <img src={item.imageUrl} />
              <h3>{item.name}</h3>
            </Link>
            <p>{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
