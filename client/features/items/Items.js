import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Items = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("/api/items");
      setItems(response.data);
    };

    fetchItems();
  }, []);

  return (
    <div className="container mx-auto mt-8 mb-48">
      <h1 className="text-4xl font-bold text-center text-shadow text-white mb-10 px-10">
        Available Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8 px-10">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:bg-blue-500 transition-colors duration-500 group"
          >
            <Link to={`/items/${item.id}`}>
              <img
                src={item.imageUrl}
                className="w-full h-48 object-cover mb-4"
                alt={item.name}
              />
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center group-hover:text-white">
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
