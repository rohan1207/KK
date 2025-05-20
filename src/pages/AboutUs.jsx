import React, { useState } from "react";
import AboutUsMain from "../components/AboutUsMain";
import StatsSection from "../components/StatsSection";
import LeadershipTeam from "../components/Leadershipteam";
import Accreditations from "../components/Accreditations";
import WhyUs from "../components/WhyUs";

const AboutUs = () => {
  const [selectedLeader, setSelectedLeader] = useState(null);

  return (
    <>
      <AboutUsMain />
      <StatsSection
        selectedLeader={selectedLeader}
        setSelectedLeader={setSelectedLeader}
      />
      <WhyUs />
      <Accreditations />
      <LeadershipTeam
        selectedLeader={selectedLeader}
        setSelectedLeader={setSelectedLeader}
      />
    </>
  );
};

export default AboutUs;
