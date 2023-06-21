import React from "react";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";
import Footer from "../features/footer/Footer";
import cloudsImage from "../../public/assets/clouds.png";

const App = () => {
  return (
    <div className="relative overflow-hidden">
      <img
        src={cloudsImage}
        className="absolute left transform -translate-x-[-100%] pointer-events-none animate-slide-and-bounce -z-10"
        alt="Clouds"
      />
      <div className="min-h-screen relative z-10">
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </div>
  );
};

export default App;
