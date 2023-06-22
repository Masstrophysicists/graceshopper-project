import React from "react";
import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";
import Footer from "../features/footer/Footer";
import cloudsImage from "../../public/assets/clouds.png";
import stardewImage from "../../public/assets/stardew.png";

const App = () => {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute w-full h-full"
        style={{
          backgroundImage: `url(${stardewImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: "-20",
        }}
      />
      <img
        src={cloudsImage}
        className="absolute left transform -translate-x-[-100%] pointer-events-none animate-slide-and-bounce z-10"
        alt="Clouds"
      />
      <div className="min-h-screen relative z-20">
        <Navbar />
        <AppRoutes />
        <Footer />
      </div>
    </div>
  );
};

export default App;
