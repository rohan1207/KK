import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Estate = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleUserInteraction = () => setShowButton(true);

    window.addEventListener("wheel", handleUserInteraction);
    window.addEventListener("touchmove", handleUserInteraction);
    window.addEventListener("scroll", handleUserInteraction);

    return () => {
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("scroll", handleUserInteraction);
    };
  }, []);

  const services = [
    {
      id: 1,
      title: "Estate Structuring",
      description:
        "Tax-efficient strategies for wealth distribution.",
    },
    {
      id: 2,
      title: "Legal & Tax Advisory",
      description:
        "Assistance with wills, trusts, and succession planning.",
    },
    {
      id: 3,
      title: "Cross-Border Estate Planning",
      description:
        "Navigating U.S.-India estate tax laws.",
    },
  ];

  const details = [
    {
      id: 1,
      title: "High-net-worth individuals & families",
      description:
        "Securing generational wealth.",
    },
    {
      id: 2,
      title: "Business owners",
      description:
        "Planning succession with tax-efficient solutions.",
    },
    {
      id: 3,
      title: "Individuals with international assets",
      description:
        "Needing cross-border legal expertise.",
    },
  ];

  const steps = [
    {
      id: 1,
      title: "Initial Planning & Strategy Development",
      description:
        "Crafting a customized estate plan.",
    },
    {
      id: 2,
      title: "Legal & Tax Structuring",
      description:
        "Setting up trusts and wills with tax efficiency.",
    },
    {
      id: 3,
      title: "Execution of Estate Plans",
      description:
        "Implementing inheritance and asset transfer strategies.",
    },
    {
      id: 4,
      title: "Ongoing Advisory & Adjustments",
      description:
        "Monitoring and refining the estate plan over time.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-[600px] flex items-center justify-center text-white text-center px-6 overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: "url('/service6.png')",
            transform: "scale(1.1)",
            transition: "transform 0.3s ease-out"
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Estate & Succession Planning
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-lg md:text-xl text-gray-200"
          >
            Secure your assets and legacy with strategic estate planning and cross-border succession solutions designed for wealth preservation.
          </motion.p>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full flex justify-center mt-8 sm:mt-10"
            >
              <Link to="/kka-contact-us">
                <motion.button
                  className="w-[194px] h-[55px] sm:w-[223px] sm:h-[64px] rounded-[20px] bg-[#FF5500] text-white font-semibold 
                           text-md sm:text-lg px-5 py-2 sm:py-3 flex justify-center items-center shadow-lg"
                  whileHover={{ scale: 1.05, backgroundColor: "#FF7733" }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  Get Started
                </motion.button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>

      {/* Offerings Section */}
      <div className="py-16 px-4 sm:px-8 md:px-12 lg:px-20 max-w-6xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900 text-center">
          What We Offer
        </h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto text-center text-sm sm:text-base">
          Tailored estate planning strategies to protect your assets and ensure efficient wealth transfer to future generations.
        </p>

        {/* Image & Service List */}
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 mt-8">
          {/* Image Section */}
          <div className="w-full md:w-[45%] flex justify-center order-1 md:order-1">
            <img
              src="/5.webp"
              alt="Offerings"
              className="w-full sm:w-[300px] lg:w-[350px] aspect-[16/10] object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Services List - Scrollable on mobile */}
          <div className="w-full md:w-[55%] order-2 md:order-2">
            <div className="h-[165px] md:h-auto overflow-y-auto md:overflow-visible space-y-4 pr-2 md:pr-0 scroll-smooth">
              {services.map((service) => (
                <div key={service.id} className="flex items-start space-x-3 sm:space-x-4 bg-white p-3 rounded-lg shadow-sm md:shadow-none">
                  {/* Service Number */}
                  <div className="bg-orange-500 text-white font-bold w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-lg flex-shrink-0">
                    {service.id}
                  </div>

                  {/* Service Title & Description */}
                  <div>
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-base">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Service Details Section */}
      <div className="py-16 px-4 sm:px-8 md:px-12 lg:px-20 max-w-6xl mx-auto mt-[-79px]">
        {/* Section Heading */}
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900 text-center">
          Who Needs This Service
        </h2>

        {/* Grid Layout */}
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 mt-8">
          {/* Service List - Scrollable on mobile */}
          <div className="w-full md:w-[55%] order-2 md:order-1">
            <div className="h-[165px] md:h-auto overflow-y-auto md:overflow-visible space-y-4 pr-2 md:pr-0 scroll-smooth">
              {details.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 sm:space-x-4 bg-white p-3 rounded-lg shadow-sm md:shadow-none">
                  {/* Number Icon */}
                  <div className="bg-orange-500 text-white font-bold w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-lg flex-shrink-0">
                    {item.id}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-[45%] flex justify-center order-1 md:order-2">
            <img
              src="/20.jpeg"
              alt="Who Needs This Service"
              className="w-full sm:w-[300px] lg:w-[350px] aspect-[16/10] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 px-4 sm:px-8 md:px-12 lg:px-20 max-w-6xl mx-auto mt-[-75px]">
        {/* Section Heading */}
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900 text-center">
          How It Works
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-center">
           Streamlined estate planning and cross-border succession solutions designed for wealth preservation.
        </p>

        {/* Grid Layout */}
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10 mt-10">
          {/* Process Steps - Scrollable on mobile */}
          <div className="w-full md:w-[55%] order-2 md:order-2">
            <div className="h-[165px] md:h-auto overflow-y-auto md:overflow-visible space-y-4 pr-2 md:pr-0 scroll-smooth">
              {steps.map((step) => (
                <div key={step.id} className="flex items-start space-x-3 sm:space-x-4 bg-white p-3 rounded-lg shadow-sm md:shadow-none">
                  {/* Step Number */}
                  <div className="bg-orange-500 text-white font-bold w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs sm:text-lg flex-shrink-0">
                    {step.id}
                  </div>

                  {/* Step Title & Description */}
                  <div>
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-base">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-[45%] flex justify-center order-1 md:order-1">
            <img
              src="/21.jpeg"
              alt="How It Works"
              className="w-full sm:w-[300px] lg:w-[350px] aspect-[16/10] object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estate;
