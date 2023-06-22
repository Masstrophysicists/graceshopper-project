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
    <div className="flex flex-col items-center justify-start h-[42rem] z-0 mt-56 ">
      <h3 className="text-3xl text-white mb-5">
        Welcome,{" "}
        <span className="text-white font-bold text-shadow">{username}!</span>
      </h3>
      <h1 className="text-5xl font-bold text-center text-shadow text-white mb-10 px-10">
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
