import React from "react";
import HeroSection from "../components/HeroSection";
import Offerings from "../components/Offerings";
import ServiceDetails from "../components/ServiceDetails";
import HowItWorks from "../components/HowItWorks";

const ServicePage = () => {
  return (
    <div className="bg-white text-gray-900">
      <HeroSection />
      <Offerings />
      <ServiceDetails />
      <HowItWorks />
    </div>
  );
};

export default ServicePage;
