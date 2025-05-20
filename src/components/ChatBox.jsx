import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    company: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const options = [
    "US Expats & Inpats",
    "Visa Holders",
    "Business Owners",
    "NRIs - Indian Taxes",
    "India Entity Formation",
    "Other"
  ];

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
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }
    
    if (!formData.company) {
      newErrors.company = "Please select a company type";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to update form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Function to send data to WhatsApp
  const sendToWhatsapp = () => {
    if (!validateForm()) {
      return;
    }

    const message = 
`New Contact Form Submission

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}
Company: ${formData.company}

Message:
${formData.message}`;

    try {
      const encodedMessage = message
        .split('\n')
        .map(line => encodeURIComponent(line))
        .join('%0A');

      const whatsappURL = `https://web.whatsapp.com/send?phone=919823149491&text=${encodedMessage}`;
      
      if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = `whatsapp://send?phone=919823149491&text=${encodedMessage}`;
      } else {
        window.open(whatsappURL, '_blank');
      }
      
    } catch (error) {
      console.error('Error creating WhatsApp link:', error);
      window.open(`https://wa.me/919823149491`, '_blank');
    }
  };

  return (
    <div className="relative w-full">
      {/* 🔶 Banner / Strip Section */}
      <div className="bg-[#f58842] text-white text-center py-10 px-6 flex justify-center items-center relative">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Get Tailored Tax Solutions Now</h2>
          <p className="text-sm mt-2">
            Connect with our experts for personalized tax advice that meets your
            unique cross-border needs.
          </p>

          {/* Buttons */}
          <div className="mt-4 flex justify-center space-x-4">
            <Link to={"Contact-us"}>
              <button
                className="w-[194px] h-[55px] sm:w-[223px] sm:h-[64px] bg-white text-black font-roboto font-medium 
                text-md sm:text-lg leading-[24px] sm:leading-[27px] text-center 
                rounded-[20px] px-5 py-2 sm:px-6 sm:py-3 
                hover:bg-gray-100 transition duration-300 ease-in-out shadow-lg hover:scale-105"
              >
                Contact
              </button>
            </Link>
          </div>
        </div>

        {/* 🟣 Chat Button - Positioned Absolutely in Strip */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="fixed bottom-6 right-6 bg-[#402569] rounded-full p-3 shadow-lg border-4 border-[#f58842] hover:scale-110 transition-transform z-50 flex items-center justify-center w-13 h-13 sm:w-16 sm:h-16"
        >
          <img src="/chat.png" alt="Chat" className="w-8 h-8 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* 💬 Chat Box - Responsive & Small on Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 bg-white rounded-2xl shadow-2xl w-[350px] sm:w-[280px] max-sm:w-[240px] overflow-hidden z-50"
          >
            {/* Header with Close Button */}
            <div className="bg-[#402569] text-white p-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center">
                <MessageCircle size={24} className="mr-2" />
                <span className="font-semibold text-lg">Chat With Us</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name *"
                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#402569]`}
              />
              {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
              
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email *"
                className={`w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#402569]`}
              />
              {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
              
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone *"
                className={`w-full border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#402569]`}
              />
              {errors.phone && <p className="text-red-500 text-sm mb-2">{errors.phone}</p>}

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full border ${errors.subject ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#402569] bg-white`}
              >
                <option value="">Select Subject *</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              {errors.subject && <p className="text-red-500 text-sm mb-2">{errors.subject}</p>}

              <select
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full border ${errors.company ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#402569] bg-white`}
              >
                <option value="">Select Company *</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              {errors.company && <p className="text-red-500 text-sm mb-2">{errors.company}</p>}
              
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message *"
                className={`w-full border ${errors.message ? 'border-red-500' : 'border-gray-300'} p-2 rounded-lg mb-3 h-20 focus:outline-none focus:ring-2 focus:ring-[#402569]`}
              />
              {errors.message && <p className="text-red-500 text-sm mb-2">{errors.message}</p>}
              
              <button
                onClick={sendToWhatsapp}
                className="bg-[#402569] text-white w-full py-2 rounded-lg hover:bg-[#311c4f] transition text-lg"
              >
                Send Message
              </button>
            </div>

            {/* Footer */}
            <p className="text-gray-500 text-center text-sm pb-4">
              Your message will be sent directly to WhatsApp.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
