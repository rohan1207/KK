import { useRef, useEffect, useState } from "react";

const locations = [
  {
    name: "US Office",
    city: "Utah, USA",
    address: `6915 South 900 East Midvale, Utah  84047`,
    phone: "801-432-8965",
    mapUrl: "https://maps.app.goo.gl/WkUMhXCqHcZDGhG26",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.1982963303753!2d-111.86856982416178!3d40.62550867140683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x875289d252801947%3A0x5828d23437ea8efd!2s6915%20S%20900%20E%2C%20Midvale%2C%20UT%2084047%2C%20USA!5e0!3m2!1sen!2sin!4v1744035671628!5m2!1sen!2sin",
  },
  {
    name: "Mumbai Office",
    city: "Mumbai, India",
    address: "6/10 Matunga Navjivan CHS, 172, Tulsi Pipe Road, Matunga (WR), Mumbai- 400016",
    phone: "+91 98231 49491",
    mapUrl: "https://maps.app.goo.gl/XjNfKT1GB5qs13yLA",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.479047720725!2d72.84142417934571!3d19.042664100000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c92e92eb806f%3A0xafa5f6c53d8f41be!2sNavjivan%20CHS!5e0!3m2!1sen!2sus!4v1744037634977!5m2!1sen!2sus"
  },
  {
    name: "Delhi/ NCR",
    city: "Delhi, India",
    address: "344, Tower B2, Spaze I-Tech, Sector-49, Sohna Road, Gurgaon- 122018, Haryana.",
    phone: "+91 98231 49491",
    mapUrl: "https://maps.app.goo.gl/nhDSfW9iKtTdwVN68",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.201930360579!2d77.04053632528061!3d28.413163175785293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d229aea4f7e0f%3A0xeccfa90483111aa0!2sTower%20B2!5e0!3m2!1sen!2sus!4v1744037772738!5m2!1sen!2sus",
  },
  {
    name: "Bengaluru",
    city: "Bengaluru, India",
    address: "F602, Purva Fountain Sqaure, Marathahalli, Bengaluru- 560037",
    phone: "+91 98231 49491",
    mapUrl: "https://maps.app.goo.gl/GLbyy49Yf6XszNd28",
    iframeSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.2254952520116!2d77.7029406748411!3d12.957417687356637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae123184269049%3A0x9822df974af274d4!2sPurva%20Fountain%20Square!5e0!3m2!1sen!2sin!4v1744037904687!5m2!1sen!2sin",
  },
];

export default function Locations() {
  return (
    <div className="mt-16 text-center">
      <h2 className="text-2xl font-semibold text-orange-500">Our Locations</h2>
      <p className="text-gray-500 mb-6">Connecting with you worldwide.</p>
      <div className="overflow-x-auto whitespace-nowrap pb-4 px-4 md:px-6">
        <div className="inline-flex space-x-6">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="block w-[280px] md:w-[320px] bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => window.open(loc.mapUrl, '_blank')}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    View in Maps
                  </span>
                </div>
                <iframe
                  src={loc.iframeSrc}
                  width="100%"
                  height="200"
                  style={{ border: "0" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="pointer-events-none"
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg hover:text-orange-500 transition-colors mb-1">{loc.name}</h3>
                <p className="text-sm text-gray-600 hover:text-orange-500 transition-colors">{loc.city}</p>
                <p className="text-sm text-gray-600 mt-2 hover:text-orange-500 transition-colors whitespace-normal break-words leading-relaxed min-h-[60px]">
                  {loc.address}
                </p>
                <a 
                  href={`tel:${loc.phone.replace(/\s+/g, '')}`}
                  className="text-sm text-gray-600 mt-2 block hover:text-orange-500 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  {loc.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
