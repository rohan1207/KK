import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookConsultation from "./pages/BookConsultation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ServicePage from "./pages/ServicePage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import AdminPanel from "./pages/AdminPanel";
import CareersPage from "./pages/CareersPage";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import ChatBox from "./components/ChatBox";
import BlogPage from "./pages/BlogPage";
import Corporate from "./services/Corporate";
import PersonalTax from "./services/PersonalTax";
import Investor from "./services/Investor";
import TaxAdvisory from "./services/TaxAdvisory";
import FinCen from "./services/FinCen";
import Estate from "./services/Estate";
import Formation from "./services/Formation";
import GiftTax from "./services/GiftTax";
import Dashboard from "./pages/Dashboard";
import ScrollToTop from "./components/ScrollToTop";
import ReactGA from "react-ga4";
import BlogDetails from "./components/BlogDetails";

ReactGA.initialize("G-8RKDFTHRWM");

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book-consultation" element={<BookConsultation />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/kka-contact-us" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPanel />
            </ProtectedAdminRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/corporate-tax" element={<Corporate />} />
        <Route path="/personal-tax" element={<PersonalTax />} />
        <Route path="/investor-services" element={<Investor />} />
        <Route path="/tax-advisory" element={<TaxAdvisory />} />
        <Route path="/fin-advisory" element={<FinCen />} />
        <Route path="/estate" element={<Estate />} />
        <Route path="/formation-advisory" element={<Formation />} />
        <Route path="/return-advisory" element={<GiftTax />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/connect-with-us" element={<ContactUs />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>
      {!isAdminRoute && <ChatBox />}
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
