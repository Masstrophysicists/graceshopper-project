import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/**
 * COMPONENT
 */
const Home = () => {
  const username = useSelector((state) => state.auth.me.username);
  const navigate = useNavigate();

  const navigateToItems = () => {
    navigate("/items");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-[-10%]">
      <h3 className="text-3xl text-gray-500 mb-5">Welcome, {username}!</h3>
      <h1 className="text-5xl font-bold text-gray-800 mb-10">
        Discover the Charm of Our Virtual Farmer's Market
      </h1>
      <div
        onClick={navigateToItems}
        className="bg-blue-500 text-white py-4 px-8 rounded-full text-xl font-semibold shadow-lg hover:bg-blue-600 cursor-pointer"
      >
        Explore Now
      </div>
    </div>
  );
};

export default Home;
