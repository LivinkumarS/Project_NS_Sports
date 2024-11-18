import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";

export default function Videos() {
  const { currentUser } = useSelector((state) => state.user);
  const apiURL = import.meta.env.VITE_API_URL;
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${apiURL}/api/video/getAllVideos?page=${currentPage}&search=${searchTerm}`
        );
        const data = await res.json();
        if (res.ok) {
          setVideos(data.videos);
          setTotalPages(data.totalPages);
        } else {
          console.error("Failed to fetch videos");
        }
      } catch (error) {
        console.error("Error fetching videos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [currentPage, searchTerm, apiURL]);

  return (
    <div className="container mx-auto p-6">
      <div className="flex w-full justify-between">
        <h1 className="text-3xl font-bold mb-6 text-center">Videos</h1>
        {(currentUser && currentUser.isAdmin) && (
          <Link to="/create-video">
            <button
              style={{ backgroundColor: "#0077b6" }}
              className="text-white px-4 py-2 rounded-xl shadow-lg transition-transform duration-200 transform hover:scale-105 hover:bg-opacity-90 focus:outline-none"
            >
              Upload Video
            </button>
          </Link>
        )}
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search videos..."
          className="input input-bordered w-full md:w-1/2 border-0 rounded-xl shadow-xl"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <div className=" min-h-[50vh] text-center text-xl">
          Loading...
          <Spinner size="sm" color="warning" aria-label="Loading spinner" />
        </div>
      ) : (
        <div className="grid grid-cols-1 min-h-[50vh] md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.length > 0 ? (
            videos.map((video) => (
              <Link
                to={`/video-post/${video.slug}`}
                key={video._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <video
                    src={video.videoURL}
                    controls
                    className="w-full h-48 object-cover mb-2"
                  />
                  <h2 className="text-lg sm:text-xl font-semibold">
                    {video.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {new Date(video.updatedAt).toLocaleDateString()}
                  </p>
                  <p>
                    {video.description.length > 60
                      ? video.description.slice(0, 56) + "..."
                      : video.description}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-2xl">{`No Videos Found :(`}</p>
          )}
        </div>
      )}

      <div className="flex justify-center items-center mt-6">
        <Button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2"
        >
          Previous
        </Button>
        <span className="text-lg font-semibold">{currentPage}</span>
        <Button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-2"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
