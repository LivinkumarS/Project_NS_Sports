import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";

export default function Blog() {
  const apiURL = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterByAuthor, setFilterByAuthor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleFilterByAuthor = (event) => {
    setFilterByAuthor(event.target.value);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${apiURL}/api/blog/getblogs?page=${currentPage}&search=${searchTerm}&author=${filterByAuthor}`
        );
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPages(data.totalPages);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage, searchTerm, filterByAuthor, apiURL]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Posts</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Search posts..."
          className="input input-bordered w-full md:w-1/2 border-0 rounded-xl shadow-xl"
          value={searchTerm}
          onChange={handleSearch}
        />
        <input
          type="text"
          placeholder="Search author..."
          className="input input-bordered w-full md:w-1/4 border-0 rounded-xl shadow-xl"
          value={filterByAuthor}
          onChange={handleFilterByAuthor}
        />
        <Link to="/createBlog">
          <button
            style={{ backgroundColor: "#0077b6" }}
            className="text-white px-4 py-2 rounded-xl shadow-lg transition-transform duration-200 transform hover:scale-105 hover:bg-opacity-90 focus:outline-none"
          >
            Create Blog
          </button>
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-xl">
          Loading...
          <Spinner
            size="sm"
            color="warning"
            aria-label="Warning spinner example"
          />
        </div>
      ) : (
        <>
          <div className="grid min-h-[40vh] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  to={`/blog-post/${post.slug}`}
                  key={post._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover mb-2"
                    />
                    <h2 className="text-lg sm:text-xl font-semibold">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {new Date(post.updatedAt).toLocaleDateString()} •{" "}
                      {post.authorName}
                    </p>
                    <span className="text-blue-500 hover:text-blue-700 font-medium">
                      Read More
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-2xl">{`No Posts...Sorry :(`}</p>
            )}
          </div>

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
        </>
      )}
    </div>
  );
}
