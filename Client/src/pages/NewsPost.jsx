import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "flowbite-react";

const NewsPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchNewsPost = async () => {
      try {
        const res = await fetch(`${apiURL}/api/news/getNews/${slug}`);
        const data = await res.json();

        if (res.ok) {
          setPost(data);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch news post. Please try again later.");
      }
    };

    fetchNewsPost();
  }, [slug]);

  if (errorMessage) {
    return <Alert color="red">{errorMessage}</Alert>;
  }

  if (!post) {
    return <div className="text-center py-6 text-xl">Loading...</div>;
  }

  return (
    <div className="news-post-page bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-xl min-h-[50vh]">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0077b6] mb-4">
          {post.title}
        </h1>
        <div className="text-sm sm:text-base text-gray-500 mb-4">
          <p className="mb-2">By: {post.authorName}</p>
          <p>{new Date(post.updatedAt).toLocaleString()}</p>
        </div>
        <div className="relative mb-6 rounded-lg overflow-hidden shadow-md shadow-gray-300">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover transition-transform transform hover:scale-105"
          />
        </div>
        <div
          className="content text-lg sm:text-xl text-gray-800 leading-relaxed mb-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 text-white bg-[#0077b6] rounded-lg shadow-lg hover:bg-[#005f8c] transition-colors"
          >
            Back to News
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default NewsPost;
