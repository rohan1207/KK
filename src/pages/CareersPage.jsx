import { useState } from "react";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
    resumeLink: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.contact)) {
      newErrors.contact = "Please enter a valid contact number";
    }
    
    if (!formData.resumeLink.trim()) {
      newErrors.resumeLink = "Resume link is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const emailBody = `
Job Application Submission

Name: ${formData.name}
Email: ${formData.email}
Contact: ${formData.contact}
Resume Link: ${formData.resumeLink}

Message:
${formData.message}
    `.trim();

    const mailtoLink = `mailto:expat@kkassociate.com?subject=${encodeURIComponent(`Job Application from ${formData.name}`)}&body=${encodeURIComponent(emailBody)}&cc=${encodeURIComponent(formData.email)}`;

    window.location.href = mailtoLink;
    setStatus("Opening your email client...");
  };

  return (
    <div className="container mx-auto p-4 md:p-8 mt-[51px]">
      {/* Careers Section */}
      <div className="text-center mb-6 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Join Our Team
        </h2>
        <p className="mt-6 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Inviting commerce graduates to work in a dynamic environment. Get in
          touch if you fulfill the following criteria.
        </p>
      </div>

      {/* Qualifications & Apply Form */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Qualifications Section */}
        <div className="bg-[#2E1A55] p-6 rounded-lg shadow-md text-white w-full md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4">Qualifications</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              At least 2 years experience in Finance, Accounting, and Taxes.
            </li>
            <li>Deep understanding of Accounting, Bookkeeping, and Taxes.</li>
            <li>Degree in Commerce.</li>
          </ul>
        </div>

        {/* Apply Now Form */}
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full md:w-1/2 border border-gray-300">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
            Apply Now
          </h3>
          {status && (
            <p className="text-center text-green-600 font-medium">
              {status}
            </p>
          )}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                type="text"
                name="contact"
                placeholder="Contact Number *"
                value={formData.contact}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.contact ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div>
              <input
                type="url"
                name="resumeLink"
                placeholder="Paste Google Drive link to your resume *"
                value={formData.resumeLink}
                onChange={handleChange}
                className={`w-full p-3 border ${errors.resumeLink ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.resumeLink && <p className="text-red-500 text-sm mt-1">{errors.resumeLink}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF5500] text-white py-3 rounded-lg hover:bg-[#FF5500] transition font-semibold text-lg"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
