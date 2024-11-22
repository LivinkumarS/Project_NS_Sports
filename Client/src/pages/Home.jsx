import React, { useEffect, useState } from "react";
import LiveMatches from "../components/LiveMatches";
import { GoDotFill } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import CompletedMatches from "../components/CompletedMatches";
import UpcomingMatches from "../components/UpcomingMatches";
import CountryFlags from "../components/CountryFlags";

const Home = () => {
  const location = useLocation();
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const [key, setKey] = useState(null);
  const [liveMatches, setLiveMatches] = useState([]);
  const [news, setNews] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [videos, setVideos] = useState([]);
  const apiURL = import.meta.env.VITE_API_URL;

  const fetchFeaturedMatches = async () => {
    try {
      const response = await fetch(`${apiURL}/api/cricket/featured-matches-2`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectKey: projectKey,
          access_token: sessionStorage.getItem("access_token"),
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const liveMatches = data.data.matches.filter((match) => {
          return match.status === "started";
        });

        setLiveMatches(liveMatches);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch(`${apiURL}/api/news/getallnews?limit=9`);
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setNews(data.posts);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${apiURL}/api/blog/getblogs?limit=8`);
      const data = await res.json();
      if (res.ok) {
        setBlogs(data.posts);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${apiURL}/api/video/getAllVideos`);
      const data = await res.json();
      if (res.ok) {
        setVideos(data.videos);
      } else {
        console.error("Failed to fetch videos");
      }
    } catch (error) {
      console.error("Error fetching videos", error);
    }
  };

  useEffect(() => {
    const path = new URLSearchParams(location.search);
    if (path.has("tab")) {
      setKey(path.get("tab"));
    } else {
      setKey(null);
    }
  }, [location.search]);

  useEffect(() => {
    fetchFeaturedMatches();
    fetchNews();
    fetchBlogs();
    fetchVideos();
  }, []);

  return (
    <div className="w-full px-3 sm:px-5 min-h-[80vh]">
      <div className="sm:mt-4 flex w-full flex-col gap-3 sm:gap-0 sm:items-start justify-center items-center sm:flex-row ">
        <div className="w-full mb-8">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between">
            <div className="flex w-full overflow-x-auto gap-0 justify-start items-center space-x-8 mt-4 mb-4">
              <Link to={"/"}>
                <h1 className="text-xl font-bold text-red-600 flex gap-1 mb-2 whitespace-nowrap">
                  Live Matches{" "}
                  <span className="mt-[4px]">
                    <GoDotFill />
                  </span>
                </h1>
              </Link>
              <div className="flex items-center justify-start gap-2 sm:gap-4">
                {liveMatches.map((match, index) => (
                  <Link
                    to={`/live/${match.key}`}
                    key={index}
                    className="text-black font-semibold p-2 px-3 bg-blue-300 rounded-3xl text-xs lg:text-sm hover:bg-gray-300  whitespace-nowrap flex items-center gap-2"
                  >
                    {match.short_name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="w-[90%] sm:w-[200px] sm:gap-4 mb-5 flex gap-4 items-center justify-center">
              <Link to={"/?tab=completed"} className="flex-1">
                <button
                  className={`${
                    key === "completed" ? "bg-blue-300 " : "bg-white"
                  } w-full text-sm sm:text-md p-2 rounded-xl hover:bg-blue-300 cursor-pointer hover:text-white font-bold`}
                >
                  Completed
                </button>
              </Link>
              <Link to={"/?tab=upcoming"} className="flex-1">
                <button
                  className={`${
                    key === "upcoming" ? "bg-blue-300 " : "bg-white"
                  } w-full text-sm sm:text-md p-2 rounded-xl hover:bg-blue-300 cursor-pointer hover:text-white font-bold`}
                >
                  Upcoming
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full mx-auto  sm:p-4 h-fit">
            {!key ? (
              <LiveMatches />
            ) : key == "completed" ? (
              <CompletedMatches />
            ) : (
              <UpcomingMatches />
            )}
          </div>
        </div>
      </div>
      {/* News and Blogs */}
      <div className="mb-9 p-3 overflow-hidden flex flex-col bg-transparent gap-3 md:flex-row w-full rounded-lg max-w-[1200px] mx-auto">
        <div className="flex-1 rounded-lg bg-white p-4 w-full">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-xl md:text-2xl">Latest News</h1>
            <Link
              to="/news"
              className="text-blue-600 hover:underline font-semibold"
            >
              See More
            </Link>
          </div>
          <hr className="my-3 bg-[#ddd]" />
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {news.length > 0 ? (
              news.map((item) => (
                <Link to={`/news-post/${item.slug}`} key={item._id}>
                  <div className="p-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-lg mb-2"
                    />
                    <h2 className="font-bold text-lg">{item.title}</h2>
                    <p className="text-gray-500 text-sm">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center">No news available</p>
            )}
          </div>
        </div>
        <div className="w-full rounded-lg bg-white md:w-[300px] p-4">
          <div className="flex items-center justify-between mb-2">
            <h1 className="font-bold text-lg md:text-xl">Latest Blogs</h1>
            <Link
              to="/blogs"
              className="text-blue-600 hover:underline font-semibold"
            >
              See More
            </Link>
          </div>
          <hr className="my-3 mb-0 bg-[#ddd]" />
          <br />
          <div className="w-full grid grid-cols-1 gap-2">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <Link to={`/blogs/${blog.slug}`} key={blog._id}>
                  <div className="w-full gap-2 p-2 rounded-lg flex items-center justify-center hover:bg-gray-50 transition">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-[100px] h-[60px] object-cover rounded"
                    />
                    <div className="flex-1 flex flex-col items-start">
                      <p className="text-sm sm:text-md font-semibold">
                        {blog.title}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center">No blogs available</p>
            )}
          </div>
        </div>
      </div>
      {/* Videos */}

      <div className="w-full max-w-[1200px] mx-auto p-3 mb-6">
        <div className="w-full rounded-lg bg-white p-4 mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-3xl font-bold">Recent Videos</h2>
            <Link
              to={`/videos`}
              className="text-blue-600 hover:underline text-md sm:text-lg md:text-xl font-bold mb-3"
            >
              See More
            </Link>
          </div>
          <hr className="my-3 bg-[#ddd]" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.length > 0 ? (
              videos.map((video, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="w-full h-full relative">
                    <iframe
                      width="100%"
                      height="225"
                      src={video.videoURL}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-t-lg"
                    ></iframe>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No videos available</p>
            )}
          </div>
        </div>
      </div>

      {/* country flags */}
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <CountryFlags />
      </div>
    </div>
  );
};

export default Home;
