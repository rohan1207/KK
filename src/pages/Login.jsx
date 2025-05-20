import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import Swal from "sweetalert2";

export default function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate("/");
      }
    };
    fetchUser();
  }, [navigate]);

  // Handle Admin Login
  const handleAdminLogin = async () => {
    if (!adminId || !adminPassword) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter both ID and password.",
      });
      return;
    }

    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("id", adminId)
      .eq("password", adminPassword)
      .single();

    if (error || !data) {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Invalid credentials.",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Redirecting to admin panel...",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("adminId", adminId);
        navigate("/admin");
      });
    }
  };

  // Handle Login
  const handleLogin = async () => {
    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter your email.",
      });
      return;
    }

    const { data, error } = await supabase
      .from("newuser")
      .select("email")
      .eq("email", email)
      .single();

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Not Registered",
        text: "You need to register first.",
        showCancelButton: true,
        confirmButtonText: "Sign Up",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#FF5500",
        cancelButtonColor: "#6c757d",
      }).then((result) => {
        if (result.isConfirmed) {
          setIsSignUp(true);
        }
      });
    } else {      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Redirecting to homepage...",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("showUserMenu", "true"); // Add flag to show menu initially
        window.location.href = "/";
      });
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdminLogin) {
      handleAdminLogin();
    } else if (isSignUp) {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  // Handle Sign-Up
  const handleSignUp = async () => {
    if (!name || !email) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please enter both name and email.",
      });
      return;
    }

    const { error } = await supabase.from("newuser").insert([{ name, email }]);

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error signing up: " + error.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Sign-up successful! Please log in.",
      }).then(() => {
        setIsSignUp(false);
      });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 relative bg-cover bg-center"
      style={{ backgroundImage: "url('/homePage.png')" }}
    >
      <div className="absolute inset-0 bg-[#2D2155] opacity-60 pointer-events-none"></div>

      <div className="relative z-10 text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          {isAdminLogin ? "Admin Login" : "Welcome Back"}
        </h1>
        <p className="text-base sm:text-lg text-gray-300 mt-2">
          {isAdminLogin
            ? "Login to admin panel"
            : isSignUp
            ? "Sign up to create your account"
            : "Login to continue"}
        </p>
      </div>

      <div className="relative z-10 bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md">
        <form onSubmit={handleSubmit}>
          {isAdminLogin ? (
            <>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                Admin Login
              </h2>
              <input
                type="text"
                placeholder="Admin ID"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="border p-2 rounded w-full mb-4"
              />
              <input
                type="password"
                placeholder="Password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="border p-2 rounded w-full mb-4"
              />
              
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md w-full hover:bg-blue-700"
              >
                Login as Admin
              </button>
            </>
          ) : (
            <>
              {isSignUp ? (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    Sign Up
                  </h2>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-6 py-2 rounded-md w-full hover:bg-green-600"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
                    Login
                  </h2>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                  />
                  <button
                    type="submit"
                    className="bg-[#FF5500] text-white px-6 py-2 rounded-md w-full hover:bg-orange-600"
                  >
                    Login
                  </button>
                </>
              )}
            </>
          )}
        </form>

        {/* Toggle Buttons */}
        <div className="mt-4 text-center">
          {!isAdminLogin && (
            <p className="text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-orange-500 font-semibold hover:underline"
              >
                {isSignUp ? "Login" : "Sign Up"}
              </button>
            </p>
          )}
          <p className="text-gray-600 mt-2">
            <button
              onClick={() => {
                setIsAdminLogin(!isAdminLogin);
                setIsSignUp(false);
              }}
              className="text-blue-600 font-semibold hover:underline"
            >
              {isAdminLogin ? "Back to User Login" : "Login as Admin"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
