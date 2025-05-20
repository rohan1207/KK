import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  StarIcon,
  UserGroupIcon,
  ChartBarIcon,
  DocumentTextIcon,
  EyeIcon,
  ClockIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import supabase from "../supabaseClient";
import Swal from "sweetalert2";

const StatCard = ({ title, value, change, color, icon: Icon, isLoading }) => (
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`p-6 rounded-xl ${color}`}
  >
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-white text-lg font-medium mb-2">{title}</h3>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-24 bg-white/20 rounded animate-pulse" />
            <span className="text-white text-lg">Loading...</span>
          </div>
        ) : (
          <h2 className="text-white text-3xl font-bold">{value}</h2>
        )}
        <p className="text-white/80 text-sm mt-2">{change}</p>
      </div>
      <Icon className="w-8 h-8 text-white" />
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([
    {
      title: "Total Blog Posts",
      value: "0",
      change: "All Time",
      color: "bg-gradient-to-r from-orange-400 to-orange-500",
      icon: DocumentTextIcon,
    },
    {
      title: "Total Visitors",
      value: "0",
      change: "Registered Users",
      color: "bg-gradient-to-r from-gray-600 to-gray-700",
      icon: EyeIcon,
    },
    {
      title: "Recent Activity",
      value: "0",
      change: "Last 7 Days",
      color: "bg-[#4DA0B0]",
      icon: ClockIcon,
    },
  ]);

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // Fetch total blog posts
        const { count: totalPosts } = await supabase
          .from("demo")
          .select("*", { count: "exact", head: true });

        // Fetch total users from newuser table
        const { count: totalUsers } = await supabase
          .from("newuser")
          .select("*", { count: "exact", head: true });

        // Fetch all posts
        const { data: posts } = await supabase
          .from("demo")
          .select("*")
          .order("date", { ascending: false });

        // Update stats
        setStats((prev) => [
          { ...prev[0], value: totalPosts || "0" },
          { ...prev[1], value: totalUsers || "0" },
          { ...prev[2], value: posts?.length || "0" },
        ]);

        setAllPosts(posts || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchDashboardData();

    // Set up real-time subscription for any changes
    const subscription = supabase
      .channel("demo_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "demo" },
        () => {
          fetchDashboardData(); // Refresh data when demo table changes
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Website Insights
        </h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          >
            Refresh Data
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} isLoading={isLoading} />
        ))}
      </div>

      {/* All Posts and Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            All Blog Posts
          </h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {isLoading ? (
              <>
                <div className="text-gray-500 mb-4">Loading...</div>
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-4 p-3"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" />
                      <div className="flex-1">
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                        <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </motion.div>
                  ))}
              </>
            ) : (
              allPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg border border-gray-100"
                >
                  <img
                    src={`https://frjabqpvtjqfhfscapke.supabase.co/storage/v1/object/public/blog-images/${post.IMAGE_URL}`}
                    alt={post.TITLE}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-800 truncate">
                      {post.TITLE}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(post.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {post.SHORT_INFO}
                    </p>
                  </div>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      try {
                        const result = await Swal.fire({
                          title: "Delete Blog Post?",
                          text: "This action cannot be undone! The blog post and its associated image will be permanently deleted.",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#d33",
                          cancelButtonColor: "#3085d6",
                          confirmButtonText: "Yes, delete it!",
                          cancelButtonText: "Cancel",
                          showLoaderOnConfirm: true,
                          preConfirm: async () => {
                            try {
                              // Show loading state
                              Swal.showLoading();

                              // First delete the image from storage if it exists
                              if (post.IMAGE_URL) {
                                const { error: storageError } =
                                  await supabase.storage
                                    .from("blog-images")
                                    .remove([post.IMAGE_URL]);

                                if (storageError) {
                                  throw new Error(
                                    `Failed to delete image: ${storageError.message}`
                                  );
                                }
                              }

                              // Then delete the blog post from the database
                              const { error: dbError } = await supabase
                                .from("demo")
                                .delete()
                                .eq("ID", post.ID);

                              if (dbError) {
                                throw new Error(
                                  `Failed to delete blog post: ${dbError.message}`
                                );
                              }

                              return true;
                            } catch (error) {
                              Swal.showValidationMessage(
                                `Delete failed: ${error.message}`
                              );
                            }
                          },
                          allowOutsideClick: () => !Swal.isLoading(),
                        });

                        if (result.isConfirmed) {
                          await Swal.fire({
                            title: "Deleted!",
                            text: "The blog post has been successfully deleted.",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                          });
                        }
                      } catch (error) {
                        console.error("Error in delete operation:", error);
                        await Swal.fire({
                          title: "Error",
                          text: "An unexpected error occurred while deleting the blog post.",
                          icon: "error",
                        });
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-sm"
        >
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Website Analytics
          </h3>
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <h4 className="font-medium text-gray-800">Total Visitors</h4>
              {isLoading ? (
                <div className="flex items-center space-x-2 my-2">
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                  <span className="text-gray-500">Loading...</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-orange-600">
                  {stats[1].value}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Registered users on the platform
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-gray-50 rounded-lg"
            >
              <h4 className="font-medium text-gray-800">Content Growth</h4>
              {isLoading ? (
                <div className="flex items-center space-x-2 my-2">
                  <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
                  <span className="text-gray-500">Loading...</span>
                </div>
              ) : (
                <p className="text-2xl font-bold text-[#4DA0B0]">
                  {stats[0].value}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Total blog posts published
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
