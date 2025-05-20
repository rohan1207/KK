import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion} from "framer-motion";

export default function LeaderInfo({ leader, onClose }) {
  // Function to close modal when clicking on navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        onClose();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      {/* Close Button in the Top-Right of Outer Container */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 text-white hover:text-gray-300 transition 
                   w-6 h-6 flex items-center justify-center z-[60]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Book Consultation Button */}
      <motion.div
        animate={{ opacity: scrollY > 100 ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="w-full flex justify-center mt-5 sm:mt-6"
      >
        <Link to="/book-consultation">
          <motion.button
            className="w-[194px] h-[55px] sm:w-[223px] sm:h-[64px] rounded-[20px] bg-[#FF5500] text-white font-semibold 
                 text-md sm:text-lg px-5 py-2 sm:py-3 flex justify-center items-center shadow-lg"
            whileHover={{ backgroundColor: "#FF7733" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            Book Consultation
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
