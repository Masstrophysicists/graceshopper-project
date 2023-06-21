import React from "react";
import { Link } from "react-router-dom";
import twitter from "../../../public/assets/twitter.png";
import github from "../../../public/assets/github.png";
import instagram from "../../../public/assets/instagram.png";

const Footer = () => {
  return (
    <footer className="bg-blue-500 text-white drop-shadow-2xl py-6 z-10">
      <div className="container mx-auto px-6 sm:px-0 text-center">
        <div className="flex justify-center space-x-8 mb-4">
          <Link
            to="/terms"
            className="text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded-full transition-colors duration-200"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/privacy"
            className="text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded-full transition-colors duration-200"
          >
            Privacy Policy
          </Link>
        </div>
        <div className="flex justify-center">
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-8 h-8 mr-2" src={twitter} alt="Twitter" />
          </a>
          <a
            href="https://www.github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-8 h-8 mr-2" src={github} alt="GitHub" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="w-8 h-8 mr-2" src={instagram} alt="Instagram" />
          </a>
        </div>
        <p className="mt-4 text-sm">© 2023 Stardew Valley Store</p>
      </div>
    </footer>
  );
};

export default Footer;
