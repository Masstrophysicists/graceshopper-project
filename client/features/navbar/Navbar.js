import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-blue-500 text-white drop-shadow-2xl py-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2 text-shadow">
          Stardew Valley Store -Online-
        </h1>
        <h2 className="text-3xl font-semibold mb-5 text-shadow animate-bounce">
          Plant Seeds, Harvest Joy!
        </h2>
        <nav>
          {isLoggedIn ? (
            <div className="flex justify-center space-x-8 mb-4">
              <Link
                to="/home"
                className="text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded-full transition-colors duration-200"
              >
                Home
              </Link>
              <button
                type="button"
                onClick={() => navigate("/items")}
                className="text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded-full transition-colors duration-200"
              >
                Items
              </button>
              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded-full transition-colors duration-200"
              >
                Orders
              </button>
              <button
                type="button"
                onClick={logoutAndRedirectHome}
                className="text-white hover:bg-red-500 hover:text-white px-4 py-2 rounded-full transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-center space-x-8 mb-4">
              <Link
                to="/login"
                className="text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded-full transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded-full transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
