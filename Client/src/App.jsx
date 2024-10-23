import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MatchDetails from "./pages/MatchDetails";
import ScrollToTop from "./components/ScrollToTop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Blog from "./pages/Blog";
import News from "./pages/News";
import Schedule from "./pages/Schedule";
import Series from "./pages/Series";
import TourDetails from "./pages/TourDetails";

export default function App() {
  const [sessStor, setSessStor] = useState(null);
  const fetchAccessToken = async () => {
    const projectKey = import.meta.env.VITE_PROJECT_KEY;
    const api_key = import.meta.env.VITE_API_KEY;

    const response = await fetch(`/api/v5/core/${projectKey}/auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: api_key,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch access token");
    }

    const data = await response.json();
    sessionStorage.clear();
    sessionStorage.setItem("access_token", data.data.token);
    setSessStor(data.data.token);
  };

  fetchAccessToken();

  return (
    sessStor && (
      <BrowserRouter>
        <Header />
        <ScrollToTop />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/news" element={<News />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/series" element={<Series />} />
          <Route path="/match/:matchKey" element={<MatchDetails />} />
          <Route path="/tournament/:tourKey" element={<TourDetails />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    )
  );
}
