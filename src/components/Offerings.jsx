import React from "react";

const Offerings = () => {
  const services = [
    {
      id: 1,
      title: "Forms Filing",
      description:
        "Expert preparation and filing of Forms 1120C, 1120S, and 1120F with meticulous attention to detail.",
    },
    {
      id: 2,
      title: "Compliance",
      description:
        "Ensuring full compliance with U.S. tax laws and IRS regulations through our comprehensive review process.",
    },
    {
      id: 3,
      title: "Optimization",
      description:
        "Strategic tax optimization approaches to maximize efficiency while maintaining compliance.",
    },
  ];

  return (
    <div className="py-16 px-6 max-w-6xl mx-auto">
      {/* Title and Description */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          What We Offer
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Our comprehensive corporate tax services ensure your business
          maintains full compliance while optimizing tax efficiency. With
          decades of experience, we provide tailored solutions for businesses of
          all sizes.
        </p>
      </div>

      {/* Offerings Section */}
      <div className="grid md:grid-cols-2 gap-10 mt-12 items-center">
        {/* Left - Image */}
        <div>
          <img
            src="/Offerings.png" // Ensure the correct path to the image
            alt="Offerings"
            className="rounded-lg shadow-md w-full"
          />
        </div>

        {/* Right - Services List */}
        <div className="space-y-6">
          {services.map((service) => (
            <div key={service.id} className="flex items-start space-x-4">
              {/* Numbered Badge */}
              <div className="bg-orange-500 text-white font-bold w-[55px] h-10 flex items-center justify-center rounded-full text-lg">
                {service.id}
              </div>

              {/* Service Content */}
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offerings;
