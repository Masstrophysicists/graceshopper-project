import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [notification, setNotification] = useState("");
  const token = window.localStorage.getItem("token");

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
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        setItemName("");
        setItemPrice("");
        setItemDescription("");
        setItemImage("");
        setNotification("Item added!");

        setTimeout(() => {
          setNotification("");
        }, 4000);
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
        <h1 className="text-4xl font-bold text-white text-shadow mb-8 text-center">
          Admin
        </h1>
        <div className="flex justify-center items-center w-full">
          <ul className="space-y-4 px-10 min-w-2/3">
            {users.map((user) => (
              <li
                key={user.id}
                className="bg-white shadow-lg rounded-lg p-4 space-y-2 max-w-md mx-auto"
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
      </div>
      <div className="mt-10 flex justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 px-10 max-w-md">
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
          <div className="flex items-center justify-between mt-8 mb-8">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200"
            >
              Add Item
            </button>
            {notification && (
              <div className=" text-green-600 font-bold text-xl">
                {notification}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
