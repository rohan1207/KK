import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function StatsSection({ selectedLeader, setSelectedLeader }) {
  const statsRef = useRef(null);

  useEffect(() => {
    if (selectedLeader && statsRef.current) {
      statsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedLeader]);

  return (
    <div
      ref={statsRef}
      className="flex flex-col items-center justify-center p-8 bg-white"
    >
      {/* Conditional Rendering for Our Story or Leader Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedLeader ? 'leader' : 'story'}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {selectedLeader ? (
            <div className="relative max-w-5xl mx-auto mt-[100px] md:mt-[120px]">
              {/* Image Container - Desktop Only */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="hidden md:block absolute left-0 -top-[120px] z-10"
              >
                <div className={`w-[320px] h-[484px] rounded-lg overflow-hidden ${
                  selectedLeader.name !== "Jaren Durham" ? "mt-[64px]" : ""
                }`}>
                  <img
                    src={selectedLeader.image}
                    alt={selectedLeader.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </motion.div>

              {/* Purple Background Container */}
              <div className="bg-[#2E1A55] rounded-2xl shadow-lg pt-8 pb-8 px-8 md:pl-[360px] relative min-h-[220px] md:min-h-[260px] flex flex-col">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedLeader(null)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white z-10 p-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Mobile Image Container */}
                <div className="md:hidden mb-6">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-center"
                  >
                    <div className="w-[280px] h-[320px] rounded-lg overflow-hidden">
                      <img
                        src={selectedLeader.image}
                        alt={selectedLeader.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Leader Details */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="h-full"
                >
                  <h2 className="text-3xl font-bold text-[#FF6B00] mb-4">
                    {selectedLeader.name}
                  </h2>
                  <p className="text-white/90 leading-relaxed text-base">
                    {selectedLeader.fullInfo}
                  </p>
                </motion.div>
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#25225D] p-8 rounded-2xl shadow-lg max-w-5xl mx-auto"
            >
              <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">
                Our Story
              </h2>
              <p className="text-gray-300 leading-relaxed">
                With decades of experience in cross-border taxation between the
                U.S. and India, we have established a strong reputation. Our team
                of experts is dedicated to providing the best services to our
                clients. We have served clients from various industries and
                countries, and our customer satisfaction rate is 98%. We are
                committed to helping our clients navigate the complex tax laws and
                regulations.
              </p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mt-12 max-w-5xl w-full">
        {[
          { value: "7+", label: "Countries Served" },
          { value: "40+", label: "Years of Experience" },
          { value: "1000+", label: "Clients Served" },
          { value: "98%", label: "Customer Satisfaction Rate" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h3 className="text-3xl font-bold text-orange-500">{stat.value}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
