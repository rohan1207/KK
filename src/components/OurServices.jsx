import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const services = [
  {
    title: "U.S. Corporate Tax Filings",
    description: "Smooth compliance with U.S. tax laws for corporations.",
    tags: ["Forms 1120C", "1120S", "1120F"],
    buttonColor: "bg-[#2E1A55] hover:bg-purple hover:scale-105 transition-all duration-300",

    path: "/corporate-tax",
    image: "service1.png",
  },
  {
    title: "U.S. Personal Tax Filings",
    description: "Hassle-free preparation and filing for U.S. residents.",
    tags: ["Forms 1040", "1040NR"],
    buttonColor: "bg-[#2E1A55] hover:bg-purple hover:scale-105 transition-all duration-300",

    path: "/personal-tax",
    image: "service2.png",
  },
  {
    title: "EB-5 Investor Services",
    description: "Navigate the EB-5 Immigrant Investor Program.",
    tags: ["Investment", "Green Card"],
    buttonColor: "bg-[#2E1A55] hover:bg-purple hover:scale-105 transition-all duration-300",
    path: "/investor-services",
    image: "service3.png",
  },
  {
    title: "Tax Advisory Services",
    description: "Expert guidance on international tax regulations.",
    tags: ["Compliance", "Consulting"],
    buttonColor: "bg-[#2E1A55] hover:bg-purple hover:scale-105 transition-all duration-300",
    path: "/tax-advisory",
    image: "service4.png",
  },
  {
    title: "FinCen Reporting",
    description: "Compliance with FinCen reporting regulations.",
    tags: ["AML", "Financial Crimes"],
    buttonColor: "bg-[#2E1A55] hover:bg-purple hover:scale-105 transition-all duration-300",
    path: "/fin-advisory",
    image: "service5.png",
  },
  {
    title: "Estate Planning",
    description: "Plan your estate effectively with expert guidance.",
    tags: ["Wealth", "Inheritance"],
    buttonColor: "bg-[#2E1A55] hover:bg-purple hover:scale-105 transition-all duration-300",
    path: "/estate",
    image: "service6.png",
  },
  {
    title: "Formation of Trusts in India & USA",
    description: "Guidance on setting up your business.",
    tags: ["Startup", "LLC", "Corporation"],
    buttonColor: "bg-[#2E1A55] hover:bg-purple hover:scale-105 transition-all duration-300",
    path: "/formation-advisory",
    image: "9.jpg",
  },
  {
    title: "Gift Tax Return",
    description: "Ensure compliance with gift tax regulations.",
    tags: ["IRS", "Exemptions"],
    buttonColor: "bg-[#2E1A55] hover:bg-purple hover:scale-105 transition-all duration-300",
    path: "/return-advisory",
    image: "22.jpg",
  },
];

const OurServices = () => {
  const [visibleServices, setVisibleServices] = useState(2);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white py-12 px-4 sm:px-6">
      <motion.h2 
        className="text-3xl font-bold text-center text-orange-500 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
        {services
          .slice(0, isLargeScreen ? services.length : visibleServices)
          .map((service, index) => (
            <ServiceCard
              key={index}
              service={service}
              isLargeScreen={isLargeScreen}
              index={index}
            />
          ))}
      </div>

      {!isLargeScreen && visibleServices < services.length && (
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() =>
              setVisibleServices((prev) => Math.min(prev + 2, services.length))
            }
            className="w-[194px] h-[55px] sm:w-[223px] sm:h-[64px] bg-[#FF5500] text-white font-roboto font-medium 
             text-md sm:text-lg leading-[24px] sm:leading-[27px] text-center 
             rounded-[20px] px-5 py-2 sm:px-6 sm:py-3 
             hover:bg-[#FF7733] transition duration-300 ease-in-out"
          >
            View More Services
          </button>
        </motion.div>
      )}
    </div>
  );
};

const ServiceCard = ({ service, isLargeScreen, index }) => {
  const navigate = useNavigate();
  const [isAndroid, setIsAndroid] = useState(false);
  const [isNewIphone, setIsNewIphone] = useState(false);

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase();
    setIsAndroid(/android/.test(userAgent));
    
    // Detect iPhone 15 and newer (based on screen dimensions)
    const isIphone = /iphone/.test(userAgent);
    const { width, height } = window.screen;
    const isNewModel = (width >= 390 && height >= 844) || (height >= 390 && width >= 844);
    setIsNewIphone(isIphone && isNewModel);
  }, []);

  return (
    <motion.div 
      className="bg-[#fff9f2] rounded-lg shadow-md p-4 flex flex-col h-full hover:shadow-lg transition duration-300 group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <motion.img
        src={service.image}
        alt={service.title}
        className="h-32 w-full object-cover rounded-md"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      />
      <h3 className="text-base sm:text-lg font-bold text-orange-600 mt-3">
        {service.title}
      </h3>
      <p className="text-gray-600 text-sm mt-2 line-clamp-2 sm:line-clamp-none">
        {service.description}
      </p>
      <div className="mt-2 flex flex-wrap">
        {service.tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-md mr-2 mb-1"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-4 flex justify-end">
        <motion.button
          onClick={() => navigate(service.path)}
          className={`w-[75px] h-[29px] sm:w-[85px] sm:h-[32px] px-3 text-white rounded-[6px] sm:rounded-[8px] 
            font-roboto font-medium text-[9px] xs:text-[10px] sm:text-[12px] leading-[20px] sm:leading-[20px] 
            ${service.buttonColor} 
            flex items-center justify-center whitespace-nowrap
            ${isLargeScreen ? "opacity-0 group-hover:opacity-100 transition-opacity duration-300" : "opacity-100"}
            ${isNewIphone ? 'text-[8.5px]' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Read More
        </motion.button>
      </div>
    </motion.div>
  );
};

export default OurServices;
