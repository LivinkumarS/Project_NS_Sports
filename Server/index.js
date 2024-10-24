import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js";
import blogRoute from "./Routes/blogRoute.js";
import fetch from "node-fetch";
import CricketRoute from "./Routes/CricketRoute.js";

dotenv.config();
const app = express();

mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING)
  .then(() => {
    console.log("Database Connected...!");
  })
  .catch((err) => {
    console.log("Connection Interrupted!");
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Listening On 3000!");
});

app.use("/api/auth", AuthRoute);
app.use("/api/blog", blogRoute);
app.use("/api/cricket", CricketRoute);

// Error Handling
app.use((err, req, res, next) => {
  const success = false;
  const statusCode = err.statusCode || 400;
  const message = err.message || "internal Server Error";
  res.status(statusCode).json({ success, statusCode, message });
});
