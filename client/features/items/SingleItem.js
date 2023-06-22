import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { me } from "../auth/authSlice";

const SingleItem = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [addToCartMessage, setAddToCartMessage] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const user = useSelector((state) => state.auth.me);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchItem();
  }, [itemId]);

  const fetchItem = async () => {
    const response = await axios.get(`/api/items/${itemId}`);
    setItem(response.data);
    setItem(response.data);
    setItemName(response.data.name);
    setItemPrice(response.data.price);
    setItemDescription(response.data.description);
    setItemImage(response.data.imageUrl);
  };

  async function addToCart() {
    await fetch("/api/cart/add/" + itemId, {
      headers: { authorization: localStorage.token },
    });
    dispatch(me());
    setAddToCartMessage("Item added to cart!");
    setTimeout(() => {
      setAddToCartMessage("");
    }, 4000);
  }

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const updatedItem = {
        name: itemName,
        price: itemPrice,
        description: itemDescription,
        imageUrl: itemImage,
      };

      const response = await axios.put(`/api/items/${itemId}`, updatedItem, {
        headers: {
          authorization: localStorage.token,
        },
      });

      if (response.status === 200) {
        setUpdateMessage("Item updated successfully!");
        fetchItem();
        setTimeout(() => {
          setUpdateMessage("");
        }, 4000);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/items/${itemId}`, {
        headers: { authorization: localStorage.token },
      });
      setDeleteMessage("Item successfully deleted!");
      setTimeout(() => {
        navigate("/items");
      }, 3000);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (!item) return null;

  return (
    <div className="container mx-auto mt-8 mb-48 px-28 max-w-2xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Item Details
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{item.name}</h1>
        <img
          src={item.imageUrl}
          className="w-64 h-64 object-cover mb-4"
          alt={item.name}
        />
        <p className="text-gray-600 mb-4">{item.description}</p>
        <p className="text-2xl font-bold text-blue-500 mb-4">${item.price}</p>
        <button
          onClick={addToCart}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600"
        >
          Add to Cart
        </button>
        {addToCartMessage && (
          <p className="text-green-500 mt-4">{addToCartMessage}</p>
        )}
      </div>

      {user.isAdmin && (
        <div className="mt-10 mb-48">
          <form onSubmit={handleUpdate} className="space-y-4">
            <h2 className="text-2xl font-bold">Update Item</h2>
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
              Update Item
            </button>
          </form>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-colors duration-200 mt-4"
          >
            Delete Item
          </button>
          {updateMessage && (
            <p className="text-green-500 font-bold mt-4">{updateMessage}</p>
          )}
          {deleteMessage && (
            <p className="text-red-500 font-bold mt-4">{deleteMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};
export default SingleItem;
