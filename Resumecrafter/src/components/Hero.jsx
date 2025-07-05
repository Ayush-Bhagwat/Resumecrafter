import React from "react";
import { motion } from "framer-motion";
import { FaChevronCircleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="hero" className="w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 bg-gray-50">
      
      {/* Left Content */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="md:w-1/2 w-full space-y-8"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight tracking-wide">
          Craft Your <span className="text-blue-600">Dream Resume</span> Effortlessly
        </h1>

        <p className="text-gray-600 text-lg md:text-xl max-w-xl">
          Create stunning, professional resumes that land interviews with zero hassle and full customization.
        </p>

        <Link to="/builder">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 text-lg flex items-center w-max">
            Start Crafting
            <FaChevronCircleDown className="ml-3 text-2xl" />
          </button>
        </Link>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="md:w-1/2 w-full mt-10 md:mt-0 flex justify-center"
      >
        <div className="overflow-hidden rounded-2xl w-full h-96 md:h-[300px] shadow-xl">
          <img
            src="/hero.png"
            alt="ResumeCrafter Hero"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
