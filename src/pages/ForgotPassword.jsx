import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/homePage.png')", // Change the path as needed
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#2D2155] opacity-60"></div>

      <div className="relative z-10 text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Forgot Password?</h1>
        <p className="mb-6">Enter your email to reset your password</p>

        <div className="bg-white text-black p-6 rounded-lg shadow-lg w-96">
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Email ID</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-orange-500"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600">
                Send Reset Link
              </button>
            </form>
          ) : (
            <p className="text-green-600">
              Password reset link sent to {email}
            </p>
          )}

          {/* Back to Login */}
          <div className="text-center mt-4">
            <Link to="/login" className="text-gray-500 text-sm underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
