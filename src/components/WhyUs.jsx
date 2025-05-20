import React from "react";
import { CheckCircle } from "lucide-react";

const WhyUs = () => {
  const features = [
    {
      title: "Cost-Effective",
      description:
        "Our Prices commence from $225 for your Federal Returns and $75 for each State return (Most Expats may not require a documenting State Tax Return).",
    },
    {
      title: "Hassle-Free",
      description:
        "Hassle-free process – fill out a simple form and send us your TAX details, we do the rest.",
    },
    {
      title: "Accurate",
      description:
        "Accurate and Money-Saving Results. Fast turnaround on our Expatriate Tax Preparation Services.",
    },
    {
      title: "Additional Services",
      description:
        "We can do Federal, State, and Small Business Returns for expatriates, as well as UK self-assessments.",
    },
  ];

  return (
    <div className="w-full px-6 py-12 md:py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Why Us?
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Expat-Expert CPAs who understand IRS tax codes extensively. We
          simplify tax laws for expatriates with precision and expertise.
        </p>
      </div>

      {/* Features Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md"
          >
            <CheckCircle className="text-[#2E1A55] w-7 h-7 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-black">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyUs;
