import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import twitter from "../../../public/assets/twitter.png";
import github from "../../../public/assets/github.png";
import instagram from "../../../public/assets/instagram.png";
import sean from "../../../public/assets/sean.png";
import emily from "../../../public/assets/emily.png";
import frank from "../../../public/assets/frank.png";
import steve from "../../../public/assets/steve.png";
import chris from "../../../public/assets/chris.png";

const Footer = () => {
  const characters = [
    { src: sean, name: "sean" },
    { src: emily, name: "emily" },
    { src: frank, name: "frank" },
    { src: steve, name: "steve" },
    { src: chris, name: "chris" },
  ];

  const [bounceStates, setBounceStates] = useState(
    characters.reduce(
      (states, character) => ({
        ...states,
        [character.name]: false,
      }),
      {}
    )
  );

  const startBouncing = (name, delay) => {
    setTimeout(() => {
      setBounceStates((states) => ({
        ...states,
        [name]: true,
      }));
    }, delay);
  };

  useEffect(() => {
    characters.forEach((character, index) => {
      startBouncing(character.name, index * 500);
    });
  }, []);

  const Character = ({ src, name }) => (
    <img
      style={{
        animation: `${bounceStates[name] ? `bounce-${name} 1s infinite` : ""}`,
        objectFit: "contain",
        marginTop:
          name === "sean"
            ? "5px"
            : name === "emily"
            ? "5px"
            : name === "frank"
            ? "20px"
            : name === "chris"
            ? "65px"
            : "0",
        transform: "scale(0.8)",
      }}
      src={src}
      alt="Character"
    />
  );

  return (
    <footer className="bg-blue-500 text-white drop-shadow-2xl py-6 z-10">
      <div className="absolute bottom-36 flex justify-center w-full space-x-2">
        {characters.map((character) => (
          <Character key={character.name} {...character} />
        ))}
      </div>
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
      <div className="container mx-auto px-6 sm:px-0 text-center">
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
