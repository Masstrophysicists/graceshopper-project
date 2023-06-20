import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemImage, setItemImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newItem = {
        name: itemName,
        price: itemPrice,
        description: itemDescription,
        imageUrl: itemImage,
      };

      const response = await axios.post("/api/items", newItem, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (response.status === 201) {
        setItemName("");
        setItemPrice("");
        setItemDescription("");
        setItemImage("");
        alert("Item added successfully!");
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          throw response;
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto mt-8 mb-48">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Admin
        </h1>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="bg-white shadow-lg rounded-lg p-4 space-y-2"
            >
              <p className="text-lg font-bold text-gray-800">
                Username: {user.username}
              </p>
              <p className="text-gray-700">Email: {user.email}</p>
              <p className="text-gray-700">
                Admin: {user.isAdmin ? "Yes" : "No"}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-10">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold">Add New Item</h2>
          <div>
            <label htmlFor="itemName" className="font-bold">
              Name
            </label>
            <input
              type="text"
              id="itemName"
              value={itemName}
              onChange={(event) => setItemName(event.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="itemPrice" className="font-bold">
              Price
            </label>
            <input
              type="text"
              id="itemPrice"
              value={itemPrice}
              onChange={(event) => setItemPrice(event.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="itemDescription" className="font-bold">
              Description
            </label>
            <input
              type="text"
              id="itemDescription"
              value={itemDescription}
              onChange={(event) => setItemDescription(event.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="itemImage" className="font-bold">
              Image
            </label>
            <input
              type="text"
              id="itemImage"
              value={itemImage}
              onChange={(event) => setItemImage(event.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
