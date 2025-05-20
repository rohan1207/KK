import React from "react";

import Hero from "../components/Hero";
import OurServices from "../components/OurServices";

import Expertise from "../components/Expertise";
import FeedBack from "../components/FeedBack";
import CompanyLogo from "../components/CompanyLogo";

const HomePage = () => {
  return (
    <>
      <Hero />
      <OurServices />

      <Expertise />

      <FeedBack />
      <CompanyLogo />
    </>
  );
};

export default HomePage;
