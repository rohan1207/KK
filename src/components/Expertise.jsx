import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Expertise() {
  const stats = [
    { value: 40, label: "Years" },
    { value: 1000, label: "Clients Served" },
    { value: 7, label: "Countries" },
  ];

  const controls = useAnimation();
  const ref = useRef(null);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [inView, controls]);

  return (
    <section ref={inViewRef} className="bg-gray-100 py-16 text-center px-6">
      <h2 className="text-3xl font-bold text-orange-500 mt-2">
        Why Choose Our Tax Advisory Services
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mt-3">
        With decades of experience in cross-border taxation, we provide
        unparalleled guidance tailored to your unique needs. Our team is
        dedicated to ensuring compliance while maximizing your tax efficiency.
      </p>

      {/* Stats Section */}
      <div className="container mx-auto grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-lg font-bold text-gray-900">
              Decades of expertise in cross-border taxation
            </p>

            {/* Counter Animation */}
            <Counter value={item.value} />

            <p className="text-xl font-medium  text-[#2E1A55]">{item.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const Counter = ({ value }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 1000; // Animation duration in ms
      const increment = value / (duration / 16); // Increment per frame

      const counter = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }
  }, [inView, value]);

  return (
    <motion.h3
      ref={ref}
      className="text-6xl font-extrabold text-[#2E1A55] mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      +{count}
    </motion.h3>
  );
};
