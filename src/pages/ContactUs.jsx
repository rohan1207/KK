import ContactInfo from "../components/ContactInfo";
import ContactForm from "../components/ContactForm";
import BusinessHours from "../components/BusinessHours";
import Locations from "../components/Locations";

export default function ContactUs() {
  return (
    <div className="container mx-auto p-6 mt-[48px]">
      {/* Map & Contact Info */}
      <div className="relative w-full h-96 mb-10">
        <div 
          className="w-full h-full rounded-lg cursor-pointer relative"
          onClick={() => window.open('https://maps.app.goo.gl/3ybXd8cSga1xAThp7', '_blank')}
        >
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 z-0 rounded-lg"></div>
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.0475158629147!2d73.87380467496196!3d18.48150678260443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eb534ebd4ac7%3A0xab78b83fe8a268ba!2sAPEX%20BUSINESS%20COURT!5e0!3m2!1sen!2sin!4v1743060856757!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-3xl z-20">
          <h2 className="text-2xl font-semibold mb-4 text-center">Head Office</h2>
          <ContactInfo />
        </div>
      </div>

      {/* Contact Form & Business Hours */}
      <div className="grid md:grid-cols-2 gap-10">
        <ContactForm />
        <BusinessHours />
      </div>

      {/* Locations Section */}
      <Locations />
    </div>
  );
}
