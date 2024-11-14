import express from "express";
import verifyUser from "../Utils/authenticateUser.js";
import {
  createNews,
  getNews,
  getAllNews,
  deleteNews,
} from "../Controllers/news.controller.js";
const router = express.Router();

router.get("/getallnews", getAllNews);
router.get("/getnews/:slug", getNews);
router.post("/create", verifyUser, createNews);
router.delete("/deletenews/:newsId/:userId", verifyUser, deleteNews);

export default router;
