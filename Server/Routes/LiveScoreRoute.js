import express, { Router } from "express";
import { liveScore } from "../Routers/LiveScore.js";

const Route=express.Router();

Route.get('/getLiveScore',liveScore)

export default Route