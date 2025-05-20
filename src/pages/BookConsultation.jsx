import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BookConsultation() {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  // Delay Back Button by 2 Seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="h-screen flex flex-col justify-center items-center text-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: "url('/homePage.png')" }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#2D215594]"></div>
      {/* Calendly Embed - Well-Styled */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white p-4 rounded-2xl shadow-xl max-w-2xl w-full"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Book a Consultation
        </h2>

        <div className="rounded-lg overflow-hidden">
          <iframe
            src="https://calendly.com/kkassociates1207/new-meeting"
            className="w-full"
            style={{
              height: "500px",
              border: "none",
              borderRadius: "10px",
            }}
          ></iframe>
        </div>

        {/* Back Button with Delay using Motion */}
        {showButton && (
          <motion.button
            onClick={() => navigate(-1)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-[#402569] text-white py-2 px-6 rounded-full hover:bg-[#311c4f] transition"
          >
            ← Back
          </motion.button>
        )}
      </motion.div>
         
    </div>
  );
}
