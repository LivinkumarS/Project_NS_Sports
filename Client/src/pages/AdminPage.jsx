import React, { useEffect, useState } from "react";
import { Button, Table, Alert } from "flowbite-react";
import { Link } from "react-router-dom";
import { BiUserCircle, BiMessageSquareDetail, BiCommentAdd } from "react-icons/bi";
import { HiArrowNarrowUp } from "react-icons/hi";
import { BsPostcard } from "react-icons/bs";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const apiURL = import.meta.env.VITE_API_URL;
  const [stats, setStats] = useState({
    totalBlogs: 0,
    todayBlogs: 0,
    totalNews: 0,
    todayNews: 0,
    totalRequests: 0,
    todayRequests: 0,
  });

  const fetchStats = async () => {
    try {
      const [blogResponse, newsResponse, requestResponse] = await Promise.all([
        fetch(`${apiURL}/api/blog/getblogs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }),
        fetch(`${apiURL}/api/news/getallnews`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }),
        fetch(`${apiURL}/api/blog/getRequestBlogs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }),
      ]);

      const blogData = await blogResponse.json();
      const newsData = await newsResponse.json();
      const requestData = await requestResponse.json();

      if (blogResponse.ok && newsResponse.ok && requestResponse.ok) {
        setStats({
          totalBlogs: blogData.totalPosts,
          todayBlogs: blogData.posts.filter(
            (post) =>
              new Date(post.createdAt).toDateString() ===
              new Date().toDateString()
          ).length,
          totalNews: newsData.totalPosts,
          todayNews: newsData.posts.filter(
            (post) =>
              new Date(post.createdAt).toDateString() ===
              new Date().toDateString()
          ).length,
          totalRequests: requestData.posts.length,
          todayRequests: requestData.posts.filter(
            (post) =>
              new Date(post.createdAt).toDateString() ===
              new Date().toDateString()
          ).length,
        });
      } else {
        throw new Error("Failed to fetch statistics.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while fetching statistics.");
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch(`${apiURL}/api/blog/getRequestBlogs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setRequests(data.posts);
      } else {
        setErrorMessage(data.message || "Failed to fetch blog post requests");
        setRequests([]);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setRequests([]);
    }
  };

  async function handleDelete(_id) {
    try {
      const res = await fetch(`${apiURL}/api/blog/deleteRequestBlog`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          _id: _id,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete the blog post request.");
      }

      setRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== _id)
      );
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  async function acceptBlog(post) {
    try {
      const res = await fetch(`${apiURL}/api/blog/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          title: post.title,
          image: post.image,
          content: post.content,
          authorName: post.authorName,
        }),
      });

      const response = await res.json();
      if (res.ok) {
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== post._id)
        );
        handleDelete(post._id);
      } else {
        throw new Error("Failed to accept the blog post request.");
      }
    } catch (error) {
      setErrorMessage("An error occurred while submitting your post.");
    }
  }

  useEffect(() => {
    fetchStats();
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <div className="w-full flex flex-wrap items-center justify-around gap-4 p-4 sm:p-6">
        
        <div className="p-4 sm:p-6 flex-grow flex flex-col gap-6 rounded-lg items-center justify-center shadow-lg">
          <div className="w-full flex flex-row gap-6 items-center justify-between">
            <p className="text-xl font-extrabold sm:text-2xl">
              Total Blogs:{" "}
              <span className="text-teal-500">{stats.totalBlogs}</span>
            </p>
            <BsPostcard fill="teal" className="text-4xl" />
          </div>
          <div className="w-full flex flex-row items-center text-lg sm:text-xl font-semibold">
            <p className="text-lg sm:text-xl font-semibold">Today: </p>
            <HiArrowNarrowUp className="text-teal-400" />
            <span className="text-teal-500">{stats.todayBlogs}</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 flex-grow flex flex-col gap-6 rounded-lg items-center justify-center shadow-lg">
          <div className="w-full flex flex-row gap-6 items-center justify-between">
            <p className="text-xl font-extrabold sm:text-2xl">
              Total News:{" "}
              <span className="text-teal-500">{stats.totalNews}</span>
            </p>
            <BiMessageSquareDetail fill="teal" className="text-4xl" />
          </div>
          <div className="w-full flex flex-row items-center text-lg sm:text-xl font-semibold">
            <p className="text-lg sm:text-xl font-semibold">Today: </p>
            <HiArrowNarrowUp className="text-teal-400" />
            <span className="text-teal-500">{stats.todayNews}</span>
          </div>
        </div>

        <div className="p-4 sm:p-6 flex-grow flex flex-col gap-6 rounded-lg items-center justify-center shadow-lg">
          <div className="w-full flex flex-row gap-6 items-center justify-between">
            <p className="text-xl font-extrabold sm:text-2xl">
              Total Requests:{" "}
              <span className="text-teal-500">{stats.totalRequests}</span>
            </p>
            <BiCommentAdd fill="teal" className="text-4xl" />
          </div>
          <div className="w-full flex flex-row items-center text-lg sm:text-xl font-semibold">
            <p className="text-lg sm:text-xl font-semibold">Today: </p>
            <HiArrowNarrowUp className="text-teal-400" />
            <span className="text-teal-500">{stats.todayRequests}</span>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-4 sm:mx-5 mt-4">Blog Post Requests</h1>
      {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
      <div className="request-blog-table overflow-x-auto sm:mx-5">
        <Table className="w-full mt-4 overflow-x-auto min-w-[800px]">
          <Table.Head>
            <Table.HeadCell>Username</Table.HeadCell>
            <Table.HeadCell>Blog Title</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className=" overflow-x-auto">
            {requests.length > 0 ? (
              requests.map((request) => (
                <Table.Row className="w-full overflow-x-auto" key={request._id}>
                  <Table.Cell>{request.authorName}</Table.Cell>
                  <Table.Cell>{request.title}</Table.Cell>
                  <Table.Cell>
                    {new Date(request.updatedAt).toLocaleString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={request.image}>
                      <img
                        src={request.image}
                        className="w-[50px]"
                        alt={request.title}
                        title={request.title}
                      ></img>
                    </Link>
                  </Table.Cell>
                  <Table.Cell className="flex gap-2">
                    <Link to={`/request-blog/${request.slug}`}>
                      <Button size="xs">View</Button>
                    </Link>
                    <Button
                      size="xs"
                      color="success"
                      onClick={() => acceptBlog(request)}
                    >
                      Accept
                    </Button>
                    <Button
                      size="xs"
                      color="failure"
                      onClick={() => handleDelete(request._id)}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="4" className="text-center">
                  No blog post requests available.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
