import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MatchDetails from "./components/MatchDetails";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const fetchAccessToken = async () => {
    const project_key = "RS_P_1845764058746327073";
    const api_key = "RS5:d024f19ab0ae9cac2d57af2c0317f5bb";

    const response = await fetch(`/api/v5/core/${project_key}/auth/`, {
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
  };

  fetchAccessToken();

  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match/:matchKey" element={<MatchDetails />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
