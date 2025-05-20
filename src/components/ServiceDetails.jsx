import React from "react";

const ServiceDetails = () => {
  const details = [
    {
      id: 1,
      title: "U.S.-Based Corporations",
      description:
        "Companies registered in the U.S. that require annual corporate tax filings.",
    },
    {
      id: 2,
      title: "Indian Businesses",
      description:
        "Indian businesses operating in the U.S. market requiring compliance.",
    },
    {
      id: 3,
      title: "Multinational Corporations",
      description:
        "Businesses with international operations that need expert tax management.",
    },
  ];

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Who Needs This Service
        </h2>
      </div>

      {/* Service Details Section */}
      <div className="grid md:grid-cols-2 gap-10 mt-12 items-center">
        {/* Left - Service List */}
        <div className="space-y-6">
          {details.map((item) => (
            <div key={item.id} className="flex items-start space-x-4">
              {/* Numbered Badge */}
              <div className="bg-orange-500 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full text-lg">
                {item.id}
              </div>

              {/* Service Content */}
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Image */}
        <div>
          <img
            src="/ServiceDetails.png" // Ensure correct image path
            alt="Who Needs This Service"
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
