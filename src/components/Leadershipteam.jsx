import { useState } from "react";

export default function LeadershipTeam({ selectedLeader, setSelectedLeader }) {
  const teamMembers = [
    {
      name: "Alpesh Gujrathi",
      image: "Alpesh_Photo.jpg",
      shortInfo:
        "Partner, KK Associates",
      fullInfo: `A Chartered Accountant since 2006, Alpesh Gujrathi brings over a decade of specialized experience in U.S. and India tax advisory, compliance, and cross-border tax planning. His core expertise lies in helping individuals and businesses navigate complex international tax landscapes—offering end-to-end services from tax filings to strategic structuring and optimization.
Over the years, Alpesh has worked with clients across diverse sectors including banking, real estate, finance, and family-owned enterprises. He has successfully implemented tax-efficient solutions for high-net-worth individuals with dual tax obligations in the U.S. and India. His deep understanding of both jurisdictions’ tax codes, coupled with his experience in audit and business advisory for privately held companies, positions him as a trusted advisor in cross-border financial matters.
Alpesh holds a degree in Commerce from the University of Pune and an Accounting qualification from the Institute of Chartered Accountants of India, New Delhi.
`,
    },
    {
      name: "Kalyankumar Gujrathi",
      image: "kalyankumar.png",
      shortInfo:
        "Senior Partner, KK Associates",
      fullInfo: `With over 30 years of experience as a partner at KKA, Kalyankumar Gujrathi is a respected authority in Indian taxation and compliance. He has successfully represented numerous clients before Indian tax authorities, offering strategic support in resolving tax scrutiny cases, litigation, and complex regulatory challenges. His deep understanding of the Indian tax system, combined with hands-on experience, makes him a trusted advisor for individuals and mid-sized family-owned businesses.
Kalyankumar has also played a pivotal role in guiding multi-million-dollar U.S. companies in establishing and scaling their operations in India, ensuring tax-efficient and regulatory-compliant market entry. His expertise extends to business valuations, strategic advisory, and cross-border structuring, bringing value to both domestic and international clients.
He holds a Bachelor's in Commerce from the University of Pune and an Accounting degree from the Institute of Chartered Accountants of India, New Delhi.
`,
    },
    {
      name: "Sachin Ahuja",
      image: "sachin.png",
      shortInfo:
        "Partner, KK Associates",
      fullInfo: `With over 12 years of post-qualification experience, Sachin Ahuja brings a cross-continental perspective to tax advisory, specializing in U.S. and India tax compliance, planning, and cross-border structuring. As a partner at KK Associates, Sachin has worked extensively with a wide range of clients—from manufacturing and engineering companies in India to mid-sized U.S. corporations and publicly listed insurance companies.
His global exposure, backed by experience at top international accounting firms, enables him to offer nuanced financial strategies tailored to complex, multi-jurisdictional tax challenges. Known for his analytical approach and practical insights, Sachin helps individuals and businesses streamline their U.S. and Indian tax filings, minimize liabilities, and ensure regulatory compliance.
He holds a Bachelor of Commerce and a Chartered Accountancy degree from India, and has been a member of the American Institute of Certified Public Accountants (AICPA) since 2009.
`,
    },
    {
      name: "Wade Higgs",
      image: "wade.jpg",
      shortInfo:
        "U.S. Tax Expert, KK Associates",
      fullInfo:
        `Wade Higgs is a licensed CPA in the State of Utah with a Master of Science in Taxation and a robust career spanning tax advisory, compliance, and accounting. With extensive experience in both individual and business tax preparation, Wade brings a wealth of practical insight to U.S. and cross-border tax matters—especially those involving India-U.S. tax treaties and dual-jurisdiction filings.
Wade has worked with one of the Big Four accounting firms and previously led the tax analyst team at TaxWorks, a major tax software provider. His background combines deep technical knowledge with a strong command of tax systems and process optimization. In addition, Wade has taught accounting courses at the University of Utah, reflecting his commitment to both education and excellence in the field.
His unique blend of academic, professional, and technological expertise allows him to advise clients navigating complex U.S. and India tax landscapes, ensuring full compliance and maximizing tax efficiencies across borders.
`,
    },
  ];

  return (
    <div className="text-center py-12 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-6">
        Meet Our Leadership Team
      </h2>

      {/* Scrollable Container for Mobile */}
      <div className="overflow-x-auto pb-4">
        {/* Responsive Grid for Team Members */}
        <div className="flex gap-4 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:flex lg:justify-center lg:gap-8 max-w-5xl mx-auto">
          {teamMembers
            .filter(
              (member) => !selectedLeader || selectedLeader.name !== member.name
            )
            .map((member, index) => (
              <div
                key={index}
                className="relative bg-[rgb(255,249,242)] shadow-lg rounded-xl overflow-hidden flex flex-col shrink-0 
                w-[240px] h-[280px] sm:w-[250px] sm:h-[320px] md:w-[270px] md:h-[346px] group"
              >
                {/* Card Content */}
                <div className="p-4 sm:p-5 flex flex-col items-center h-full">
                  {/* Leader Image Container with Fixed Dimensions */}
                  <div className="w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] rounded-full overflow-hidden mb-3 sm:mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Default Content - Always Visible */}
                  <div className="text-center">
                    <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1 sm:mb-2">
                      {member.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 sm:line-clamp-2">
                      {member.shortInfo}
                    </p>
                  </div>
                </div>

                {/* Hover Overlay - Only on Desktop */}
                <div 
                  className="hidden sm:flex absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                  flex-col justify-between p-6 rounded-xl"
                  style={{
                    background: 'linear-gradient(180deg, rgba(99, 73, 187, 0.5) 37.17%, #2D2155 81.57%)'
                  }}
                >
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-sm text-gray-100 line-clamp-2">
                      {member.shortInfo}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedLeader(member)}
                    className="absolute bottom-4 right-4 px-4 py-2 bg-[#FF6B00] text-white text-sm font-medium rounded-lg hover:bg-[#e65900] transition-colors"
                  >
                    Read More
                  </button>
                </div>

                {/* Mobile Read More Button */}
                <button
                  onClick={() => setSelectedLeader(member)}
                  className="block sm:hidden absolute bottom-3 right-3 px-2.5 py-1 bg-[#2D2155] text-white text-[10px] font-medium rounded-md shadow-md hover:bg-[#3d3165] transition-colors"
                >
                  Read More
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
