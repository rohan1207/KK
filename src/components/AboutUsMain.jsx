import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUsMain = () => {
  return (
    <div
      className="relative w-full h-screen flex items-center justify-center text-white text-center"
      style={{
        backgroundImage: "url('/meeting.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#2D2155",
          opacity: 0.58,
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">
        <h2 className="text-4xl font-bold">
          About <br></br>KK Associates
        </h2>
        <p className="text-lg mt-4">
          With years of expertise in U.S.-India taxation, we simplify complex
          tax laws for individuals, businesses, and professionals.
        </p>
      </div>
    </div>
  );
};

export default AboutUsMain;
