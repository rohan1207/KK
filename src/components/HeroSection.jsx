import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => setShowButton(true);

    // Attach multiple event listeners for instant detection
    window.addEventListener("wheel", handleUserInteraction);
    window.addEventListener("touchmove", handleUserInteraction);
    window.addEventListener("scroll", handleUserInteraction);

    return () => {
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };
  }, []);

  return (
    <div
      className="relative bg-cover bg-center min-h-[600px] flex items-center justify-center text-white text-center px-6"
      style={{ backgroundImage: "url('/ServiceSection.png')" }}
    >
      {/* Overlay for dark effect */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold">
          U.S. Corporate Tax Filings
        </h1>
        <p className="mt-3">
          Ensure seamless compliance with our expert tax filing services.
        </p>
        {showButton && (
          <motion.a
            href="/kka-contact-us"
            className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-md font-medium shadow-lg hover:bg-orange-600 transition"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Get Started Today
          </motion.a>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
