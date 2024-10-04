import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

/* MENTOR */
import Mentor from './mentor/mentor.jsx';
import MentorDashboard from './mentor/mentordashboard/mentordashboard.jsx';
import EnquiryinMentorDashboard from './mentor/mentordashboard/enquiry.jsx';

/* FRONTEND */
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Whatwedo from "./components/Whatwedo/Whatwedo";
import Services from "./components/Services/Services";
import AppStoreBanner from "./components/AppStoreBanner/AppStoreBanner";
import Contact from "./components/Contact/Contact";
import Results from "./components/Results/Results";
import Transformation from "./components/Transformation/Transformation";
import Testimonials from "./components/Testimonials/Testimonials";
import Footer from "./components/Footer/Footer";
import Banner2 from "./components/Banner2/Banner2";

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Banner2 />
              <Whatwedo />
              <Contact />
              <Services />
              <Results />
              <AppStoreBanner />
              <Transformation />
              {/* <Testimonials /> */}
              <Footer />
            </>
          } />

          {/* Mentor Login route */}
          <Route path="/mentor" element={<Mentor />} />
          {/* Mentor Dashboard route */}
          <Route path="/mentordashboard" element={<MentorDashboard />} />
          <Route path="/enquiry" element={<EnquiryinMentorDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
