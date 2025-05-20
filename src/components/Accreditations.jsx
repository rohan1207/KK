import { useState } from "react";
import { ShieldCheck, Trophy } from "lucide-react";
import { FiDownload } from "react-icons/fi"; // Download icon

export default function Accreditations() {
  const [showModal, setShowModal] = useState(false);

  const handleDownload = () => {
    window.open(
      "https://drive.google.com/uc?export=download&id=1_Qal6Th9A5j8EzmEFmlULJl_bfxO8Phy",
      "_blank"
    );
    setShowModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center p-6">
      {/* Accreditations Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 border w-80">
        <h4 className="text-lg font-semibold mb-3">Accreditations</h4>
        <div
          className="flex items-center gap-3 text-gray-700 mb-2 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <span className="bg-orange-500 p-2 rounded-lg text-white">
            <ShieldCheck />
          </span>
          <p className="flex items-center gap-3">
            Certified U.S. Tax Experts
            <FiDownload className="text-gray-500 text-lg" />
          </p>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <span className="bg-orange-500 p-2 rounded-lg text-white">
            <ShieldCheck />
          </span>
          <p>Recognized by International Tax Authorities</p>
        </div>
      </div>

      {/* Recognition Section */}
      <div className="bg-white shadow-lg rounded-xl p-6 border w-80">
        <h4 className="text-lg font-semibold mb-3">Recognition</h4>
        <div className="flex items-center gap-3 text-gray-700 mb-2">
          <span className="bg-orange-500 p-2 rounded-lg text-white">
            <Trophy />
          </span>
          <p>30+ Years of Excellence</p>
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <span className="bg-orange-500 p-2 rounded-lg text-white">
            <Trophy />
          </span>
          <p>Trusted by Global Clients</p>
        </div>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Download Certificate</h3>
            <p className="text-gray-600 mb-4">
              Would you like to download the certificate?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Download
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
