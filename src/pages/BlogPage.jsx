import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import supabase from "../supabaseClient";
import { FiSearch, FiCalendar, FiUser } from "react-icons/fi";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("demo")
          .select("*")
          .order('date', { ascending: false });

        if (error) {
          console.error("Error fetching blogs:", error);
          return;
        }

        // Process the image URLs
        const blogsWithImages = data.map((blog) => {
          console.log('Original IMAGE_URL:', blog.IMAGE_URL);
          
          // If no image URL, use default
          if (!blog.IMAGE_URL) {
            console.log('No image URL, using default');
            return { ...blog, IMAGE_URL: "/service1.png" };
          }

          // Clean up the image URL by removing newlines and extra whitespace
          const cleanImageUrl = blog.IMAGE_URL.trim().replace(/[\r\n]+/g, '');
          
          // Get the public URL from Supabase storage
          const { data: storageData } = supabase.storage
            .from('blog-images')
            .getPublicUrl(cleanImageUrl);
            
          console.log('Clean image URL:', cleanImageUrl);
          console.log('Generated public URL:', storageData?.publicUrl);

          return {
            ...blog,
            IMAGE_URL: storageData?.publicUrl || "/service1.png"
          };
        });

        console.log('Processed blogs:', blogsWithImages);
        setBlogs(blogsWithImages);
      } catch (err) {
        console.error("Error in fetch operation:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.TITLE.toLowerCase().includes(search.toLowerCase());
    const matchesAuthor = authorFilter ? blog.AUTHOR.toLowerCase().includes(authorFilter.toLowerCase()) : true;
    const matchesDate = dateFilter ? new Date(blog.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString() : true;
    return matchesSearch && matchesAuthor && matchesDate;
  });

  // Calculate pagination values
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Handle page changes
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers array
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Show max 5 page numbers at a time
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start if we're near the end
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  // 🎯 Framer Motion - Parallax effect on scroll
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-16 mt-[88px]">
      {/* 🎯 Parallax Top Ribbon */}
      <motion.div
        style={{ y: yText }}
        className="bg-gradient-to-r from-[#FF5500] to-[#FF7733] w-[85%] mx-auto text-white p-8 md:p-10 rounded-xl flex flex-col md:flex-row justify-between items-start gap-8 mb-10 shadow-xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Left Section - Title */}
        <div className="text-left w-full md:w-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Explore Our Blogs
          </motion.h2>
          <motion.p 
            className="text-lg mt-2 text-white/90"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover insights and expertise in tax and finance
          </motion.p>
        </div>

        {/* Right Section - Search and Filters */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="w-full md:w-auto flex flex-col gap-4"
        >
          {/* Search Bar with Icon */}
          <div className="relative w-full md:w-[400px]">
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[50px] pl-12 pr-4 rounded-xl bg-white/95 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md transition-all duration-300 text-base"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
          </div>

          {/* Filters Container */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-[400px]">
            {/* Author Filter */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Filter by author"
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                className="w-full h-[50px] pl-12 pr-4 rounded-xl bg-white/95 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md transition-all duration-300 text-base"
              />
              <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            </div>

            {/* Date Filter */}
            <div className="relative flex-1">
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full h-[50px] pl-12 pr-4 rounded-xl bg-white/95 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-md transition-all duration-300 text-base appearance-none"
              />
              <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 🎯 Blog List */}
      <div className="w-[90%] sm:w-[85%] mx-auto space-y-8 sm:space-y-10">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : filteredBlogs.length > 0 ? (
          <>
            {currentBlogs.map((blog, index) => (
              <motion.div
                key={blog.ID}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0px 12px 30px rgba(0,0,0,0.2)",
                  }}
                  className="bg-white w-full md:w-[1100px] md:ml-[80px] overflow-hidden flex flex-col md:flex-row transition-all duration-300 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-lg hover:border-orange-500/30"
                >
                  {/* Blog Image with Parallax Effect */}
                  <div className="flex-shrink-0 flex justify-center items-center w-full md:w-72 mb-4 md:mb-0">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative overflow-hidden rounded-xl w-full h-48 md:h-52"
                    >
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={blog.IMAGE_URL}
                        alt={blog.TITLE}
                        className="w-full h-full object-cover transition-transform duration-500 shadow-md"
                        onError={(e) => {
                          console.log('Image load error for:', blog.IMAGE_URL);
                          e.target.onerror = null;
                          e.target.src = "/service1.png";
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
                      />
                    </motion.div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-2 sm:p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <motion.h2 
                        className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-orange-500 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {blog.TITLE}
                      </motion.h2>
                      <p className="text-gray-600 mt-2 text-sm sm:text-md text-left line-clamp-3 sm:line-clamp-4">
                        {blog.SHORT_INFO}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-2 sm:gap-0">
                      <p className="text-xs sm:text-sm text-gray-500 order-2 sm:order-1">
                        {blog.AUTHOR} - {new Date(blog.date).toLocaleDateString()}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05, x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/blog/${blog.ID}`)}
                        className="order-1 sm:order-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-300 text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto"
                      >
                        Read More
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Horizontal Line with Animation */}
                {index !== filteredBlogs.length - 1 && (
                  <motion.hr 
                    className="w-[90%] sm:w-[80%] mx-auto border-t border-gray-300 mt-6"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                )}
              </motion.div>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-12 pb-8">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-orange-50'
                  } border border-gray-300`}
                >
                  1
                </button>

                {currentPage > 3 && (
                  <span className="px-2 text-gray-500">...</span>
                )}

                {getPageNumbers().map((number) => (
                  number !== 1 && number !== totalPages && (
                    <button
                      key={number}
                      onClick={() => handlePageChange(number)}
                      className={`px-3 py-1 rounded-md ${
                        currentPage === number
                          ? 'bg-orange-500 text-white'
                          : 'bg-white text-gray-700 hover:bg-orange-50'
                      } border border-gray-300`}
                    >
                      {number}
                    </button>
                  )
                ))}

                {currentPage < totalPages - 2 && (
                  <span className="px-2 text-gray-500">...</span>
                )}

                {totalPages > 1 && (
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-orange-50'
                    } border border-gray-300`}
                  >
                    {totalPages}
                  </button>
                )}

                {/* Next Page Arrow */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-white text-gray-700 hover:bg-orange-50'
                  } border border-gray-300 ml-2`}
                >
                  Next Page →
                </button>
              </div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-2xl font-semibold text-gray-700">No blogs found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
