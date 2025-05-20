import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const ProtectedAdminRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      const adminId = localStorage.getItem("adminId");
      const lastActivity = localStorage.getItem("lastAdminActivity");

      // Check session timeout
      if (lastActivity && Date.now() - parseInt(lastActivity) > SESSION_TIMEOUT) {
        console.log("Session timed out");
        handleLogout();
        return;
      }

      if (!isAdmin || !adminId) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        // Verify admin credentials against database
        const { data: adminData, error: adminError } = await supabase
          .from("admin_users")
          .select("*")
          .eq("id", adminId)
          .single();

        if (adminError || !adminData) {
          console.error("Admin verification failed:", adminError?.message);
          handleLogout();
          return;
        }

        // Update last activity timestamp
        localStorage.setItem("lastAdminActivity", Date.now().toString());
        localStorage.setItem("adminRole", adminData.role || "admin"); // Store admin role
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Error verifying admin:", err);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    verifyAdmin();

    // Set up session monitoring
    const activityInterval = setInterval(() => {
      const lastActivity = localStorage.getItem("lastAdminActivity");
      if (lastActivity && Date.now() - parseInt(lastActivity) > SESSION_TIMEOUT) {
        console.log("Session timed out during interval check");
        handleLogout();
      }
    }, 60000); // Check every minute

    // Update last activity on user interaction
    const updateActivity = () => {
      if (isAuthenticated) {
        localStorage.setItem("lastAdminActivity", Date.now().toString());
      }
    };

    window.addEventListener("mousemove", updateActivity);
    window.addEventListener("keydown", updateActivity);

    return () => {
      clearInterval(activityInterval);
      window.removeEventListener("mousemove", updateActivity);
      window.removeEventListener("keydown", updateActivity);
    };
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    // Clear all admin-related data
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminId");
    localStorage.removeItem("lastAdminActivity");
    localStorage.removeItem("adminRole");
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
