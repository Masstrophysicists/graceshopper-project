import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import Items from "../features/items/Items";
import { me } from "./store";
import SingleItem from "../features/items/singleItem";
import Cart from "../features/cart/Cart";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      {isLoggedIn ? (
        <div className="relative z-30">
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route to="/home" element={<Home />} />
            <Route path="/items" element={<Items />} />
            <Route path="/items/:itemId" element={<SingleItem />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      ) : (
        <div className="relative z-30">
          <Routes>
            <Route
              path="/*"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/signup"
              element={<AuthForm name="signup" displayName="Sign Up" />}
            />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default AppRoutes;
