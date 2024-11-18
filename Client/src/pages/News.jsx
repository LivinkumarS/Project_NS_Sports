import { Spinner } from "flowbite-react";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function News() {
  const apiURL = import.meta.env.VITE_API_URL;
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRangeFilter, setDateRangeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const extractFirst100Words = (htmlContent) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    const words = textContent.split(/\s+/);
    return words.slice(0, 100).join(" ") + "...";
  };

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiURL}/api/news/getallnews?page=${page}&limit=9&search=${searchTerm}&dateRange=${dateRangeFilter}`
      );
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, searchTerm, dateRangeFilter]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDateRangeFilter = (e) => {
    setDateRangeFilter(e.target.value);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="news-page bg-gray-100 min-h-screen p-6">
      <div className="flex justify-between w-full max-w-[1200px] mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Latest News
        </h1>
        {currentUser && currentUser.isAdmin && (
          <Link to="/create-news">
            <button
              style={{ backgroundColor: "#0077b6" }}
              className="text-white px-4 py-2 rounded-xl shadow-lg transition-transform duration-200 transform hover:scale-105 hover:bg-opacity-90 focus:outline-none"
            >
              Create News
            </button>
          </Link>
        )}
      </div>

      <div className="filters max-w-[1200px] mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={handleSearch}
          className="rounded-lg text-xs sm:text-[15px] max-w-[600px] sm:flex-1 sm:p-3 border-0 shadow-lg w-full md:w-1/5 focus:ring-[#0077b6] focus:border-[#0077b6]"
        />
        <select
          value={dateRangeFilter}
          onChange={handleDateRangeFilter}
          className="rounded-lg text-xs sm:text-[15px] sm:p-3 border-0 shadow-lg w-full md:w-1/5 focus:ring-[#0077b6] focus:border-[#0077b6]"
        >
          <option value="">Filter by date</option>
          <option value="today">Today</option>
          <option value="this-week">This Week</option>
          <option value="this-month">This Month</option>
        </select>
      </div>

      <div className="max-w-[800px] min-h-[40vh] grid grid-cols-1  mx-5 sm:mx-auto gap-6">
        {loading ? (
          <p className="text-center text-gray-600">Loading...
          <Spinner
            size="sm"
            color="warning"
            aria-label="Warning spinner example"
          /></p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <Link
              to={`/news-post/${post.slug}`}
              key={post._id}
              className="news-post bg-white rounded-lg shadow-lg p-3 transition-transform transform hover:scale-105"
            >
              <img
                src={post.image}
                alt={post.title}
                className="mb-4 w-full h-48 object-cover rounded-lg"
              />
              <h2 className="text-lg sm:text-xl font-semibold text-[#0077b6]">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500">
                {post.date} | {post.authorName}
              </p>
              <p className="mb-2 text-gray-700">
                {extractFirst100Words(post.content)}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-2xl">{`No News...Sorry :(`}</p>
        )}
      </div>

      <div className="pagination-controls flex justify-center items-center gap-4 mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-[#0077b6] text-white rounded-lg hover:bg-[#005f8a] disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-[#0077b6] text-white rounded-lg hover:bg-[#005f8a] disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
