import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MatchDetails from "./components/MatchDetails";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
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
  };

  fetchAccessToken();

  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match/:matchKey" element={<MatchDetails />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
