import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (scrollY < 100) {
      controls.start({ opacity: 1, y: 0, scale: 1 });
    } else if (scrollY < 300) {
      controls.start({ opacity: 1, y: -20, scale: 0.9 });
    } else if (scrollY < 600) {
      controls.start({ opacity: 0, y: -50, scale: 0.8 });
    } else {
      controls.start({ opacity: 0, scale: 0.7 });
    }
  }, [scrollY, controls]);

  return (
    <div
      className="h-screen flex flex-col justify-center items-center text-center bg-cover bg-center relative px-4 sm:px-6 md:px-12"
      style={{ backgroundImage: "url('/homePage.png')" }}
    >
      {/* Add Content Here */}

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#2D215594]"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full px-2 sm:px-4 md:px-8"
        animate={controls}
        transition={{ duration: 0.3 }}
      >
        {/* Logo and Company Name */}
        <motion.div className="mb-4 sm:mb-6 flex flex-col items-center">
          <motion.img
            src="/logo.png"
            alt="KK Associates Logo"
            className="w-[250px] sm:w-[350px] md:w-[580px] h-auto mx-auto"
            animate={{
              scale: scrollY > 100 ? 0.8 : 1,
              opacity: scrollY > 600 ? 0 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Main Heading & Subheading */}
        <motion.h2
          className="text-white text-center font-roboto font-bold text-[32px] sm:text-[48px] md:text-[56px] 
             leading-[40px] sm:leading-[55px] md:leading-[67px] 
             max-w-full sm:max-w-[1045px] mx-auto"
          animate={{ opacity: scrollY > 300 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          Seamless Cross-Border Tax Solutions{" "}
          <span className="inline-block">Between the U.S. & India</span>
        </motion.h2>

        <motion.p
          className="text-gray-300 text-center font-roboto font-normal text-[18px] leading-[27px] 
             sm:text-lg max-w-full sm:max-w-[1045px] px-4 sm:px-0 mt-3 sm:mt-4 mx-auto"
          animate={{ opacity: scrollY > 300 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          Navigating the complexities of cross-border taxation can be daunting.
          Our expert guidance ensures compliance and maximizes your tax
          efficiencies.
        </motion.p>

        {/* Book Consultation Button */}
        <motion.div
          animate={{ opacity: scrollY > 50 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-full flex justify-center mt-8 sm:mt-10 md:mt-12"
        >
          <Link to="/book-consultation">
            <motion.button
              className="w-[194px] h-[55px] sm:w-[223px] sm:h-[64px] rounded-[20px] bg-[#FF5500] text-white font-semibold 
                 text-md sm:text-lg px-5 py-2 sm:py-3 flex justify-center items-center shadow-lg hover:scale-105"
              whileHover={{ backgroundColor: "#FF7733" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              Book  Consultation
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
