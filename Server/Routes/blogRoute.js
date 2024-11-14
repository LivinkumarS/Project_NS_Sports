import express from "express";
import verifyUser from "../Utils/authenticateUser.js";
import {
  createBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  getRequestBlogs,
  deleteRequestBlog,
  getRequestBlog,
} from "../Controllers/blog.controller.js";
const router = express.Router();

router.get("/getblogs", getAllBlogs);
router.get("/getblog/:slug", getBlog);
router.post("/create", verifyUser, createBlog);
router.delete("/deleteblog/:blogId/:userId", verifyUser, deleteBlog);

// Request blog routes

router.get("/getRequestBlogs", verifyUser, getRequestBlogs);
router.get("/getRequestBlog/:slug", verifyUser, getRequestBlog);
router.delete("/deleteRequestBlog", deleteRequestBlog);

export default router;
