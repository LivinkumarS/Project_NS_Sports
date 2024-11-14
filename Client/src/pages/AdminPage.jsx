import React, { useEffect, useState } from "react";
import { Button, Table, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const apiURL = import.meta.env.VITE_API_URL;

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
    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Blog Post Requests</h1>
      {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
      <div className="request-blog-table overflow-x-auto">
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
