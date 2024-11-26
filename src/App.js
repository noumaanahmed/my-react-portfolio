import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    // Timer for preloader
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, []);

  // Call Netlify Function to log visitor details
  useEffect(() => {
    const trackVisitor = async (geoLocation) => {
      try {
        const response = await fetch("/.netlify/functions/trackVisitorsWithIPstack", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(geoLocation),
        });
        const data = await response.json();
        console.log("Visitor Logged:", data.message);
      } catch (error) {
        console.error("Error logging visitor:", error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Get latitude and longitude
          const geoLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          console.log("Geolocation captured:", geoLocation);
          trackVisitor(geoLocation); // Send to Netlify function
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          trackVisitor(null); // Send only headers if geolocation fails
        }
      );
    } else {
      console.warn("Geolocation not supported by this browser.");
      trackVisitor(null); // Send only headers if geolocation is unavailable
    }
  }, []); // Empty dependency array ensures this runs once on initial load

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
