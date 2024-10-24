import express from "express";
import { auth, match, featuredMatches2,featuredTournaments, getFlag, tournament, tournamentFixtures } from "../Controllers/cricket.controller.js";

const router = express.Router();

router.post('/auth',auth);
router.post('/match',match);
router.post('/featured-matches-2',featuredMatches2);
router.post('/featured-tournaments',featuredTournaments);
router.post('/get-flag',getFlag);
router.post('/tournament',tournament);
router.post('/tournament-fixtures',tournamentFixtures);

export default router;
