import express from "express";
import verifyUser from "../Utils/authenticateUser.js"
import {
  createBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
} from "../Controllers/blog.controller.js";
const router = express.Router();

router.get("/getblogs", getAllBlogs);
router.get("/getblog/:blogId", getBlog);
router.post("/create", verifyUser, createBlog);
router.delete("/deleteblog/:blogId/:userId", verifyUser, deleteBlog);

export default router;
