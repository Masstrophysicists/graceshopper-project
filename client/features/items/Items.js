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
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Items for sale!
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:bg-blue-500 transition-colors duration-500"
          >
            <Link to={`/items/${item.id}`}>
              <img
                src={item.imageUrl}
                className="w-full h-48 object-cover mb-4"
                alt={item.name}
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                {item.name}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Items;
