import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BookConsultation from "../pages/BookConsultation";
import AboutUs from "../pages/AboutUs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Navbar />
        <Route path="/" element={<HomePage />} />
        <Route path="/book-consultation" element={<BookConsultation />} />
        <Route path="/about" element={<AboutUs />} />
        <Footer />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
