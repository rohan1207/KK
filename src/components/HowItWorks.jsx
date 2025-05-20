import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Initial Consultation",
      description:
        "Comprehensive review of your business structure and tax requirements.",
    },
    {
      id: 2,
      title: "Document Review",
      description:
        "Thorough analysis of financial documents and previous filings.",
    },
    {
      id: 3,
      title: "Tax Filing",
      description:
        "Expert preparation and submission of all required tax forms.",
    },
    {
      id: 4,
      title: "Post-Filing Support",
      description:
        "Ongoing assistance and support for any follow-up requirements.",
    },
  ];

  return (
    <div className="py-16 px-6 md:px-12 lg:px-20 text-center ">
      <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
      <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
        Our streamlined process ensures efficient and accurate tax filing
        services.
      </p>
      <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">
        {/* Left - Image */}
        <div>
          <img
            src="/HowItWorks.png"
            alt="How It Works"
            className="rounded-lg shadow-md w-full"
          />
        </div>

        {/* Right - Steps */}
        <div className="space-y-6">
          {steps.map((step) => (
            <div key={step.id} className="flex items-start space-x-4">
              {/* Numbered Badge */}
              <div className="bg-orange-500 text-white font-bold w-10 h-10 flex items-center justify-center rounded-full text-lg">
                {step.id}
              </div>
              {/* Step Content */}
              <div>
                <h3 className=" flex text-xl font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-left sm:text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
