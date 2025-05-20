import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CompanyLogo() {
  const logos = [
    "/amazon.webp",
    "/intel.svg",
    "/amdo.png",
    "/adobe.svg",
    "/oliver.png",
    "/microsoft.webp",
    "/Arista.webp",
    "/amazon.webp",
    "/intel.svg",
    "/amdo.png",
    "/adobe.svg",
    "/oliver.png",
    "/microsoft.webp",
    "/Arista.webp",
   
   
  ];

  // Triple the logos to ensure smooth infinite scroll
  const infiniteLogos = [...logos, ...logos, ...logos];

  return (
    <section className="bg-white py-16 text-center px-6 mt-[-133px]">
      {/* Company Logos Section */}
      <div className="mt-12">
        <h3 className="text-3xl font-bold text-orange-500">
          <span className="block sm:hidden">Trusted By</span>
          <span className="hidden sm:block">Chosen By Professionals At</span>
        </h3>

        <div className="relative overflow-hidden w-full mt-8">
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="overflow-hidden flex justify-center">
            <motion.div
              className="flex space-x-10"
              animate={{
                x: [0, -logos.length * 152], // 152px = logo width (112px) + space between (40px)
              }}
              transition={{
                x: {
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              style={{
                width: `${infiniteLogos.length * 152}px`, // Ensure enough width for all logos
              }}
            >
              {infiniteLogos.map((src, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ width: "112px", height: "56px" }} // Fixed dimensions for logo container
                >
                  <img
                    src={src}
                    alt="Company Logo"
                    className="max-h-[40px] w-auto max-w-[100px] object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
