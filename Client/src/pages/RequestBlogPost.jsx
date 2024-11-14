import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "flowbite-react";

const RequestBlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        const res = await fetch(`${apiURL}/api/blog/getRequestBlog/${slug}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          setPost(data);
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage("Failed to fetch blog post. Please try again later.");
      }
    };

    fetchBlogPost();
  }, [slug]);

  if (errorMessage) {
    return <Alert color="red">{errorMessage}</Alert>;
  }

  if (!post) {
    return <div className="text-center py-6 text-xl">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg shadow-gray-300">
      <h1 className="text-3xl font-extrabold text-[#0077b6] mb-6 text-center sm:text-4xl">
        {post.title}
      </h1>
      <p className="text-gray-600 text-lg text-center mb-6">
        By:{` `} {post.authorName}
      </p>
      <div className="bg-yellow-200 text-yellow-700 p-4 rounded-lg mb-6">
        This blog post is not approved by the admin yet. Please check back
        later.
      </div>
      <div className="w-full h-auto mb-8 relative rounded-lg overflow-hidden shadow-md shadow-gray-200">
        <img
          src={post.image}
          alt="Blog"
          className="w-full h-full object-cover transition-transform transform hover:scale-105"
        />
      </div>
      <div
        className="content mb-8 text-lg leading-relaxed text-gray-800"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="flex justify-center">
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-6 py-2 text-white bg-[#0077b6] rounded-lg shadow-lg hover:bg-[#005f8c] transition-colors"
        >
          Back to Posts
        </button>
      </div>
    </div>
  );
};

export default RequestBlogPost;
