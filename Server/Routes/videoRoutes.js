import express from 'express';
import { createVideo, getVideos, getVideoBySlug } from '../Controllers/video.controller.js';

const router = express.Router();

router.get('/getAllVideos', getVideos);
router.get('/getVideo/:slug', getVideoBySlug);
router.post('/createVideo', createVideo);

export default router;
