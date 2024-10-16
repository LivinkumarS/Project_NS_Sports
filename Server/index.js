import express from "express";
import LiveScoreRoute from './Routes/LiveScoreRoute.js'

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Listening On 3000!");
});

app.use('/api/score',LiveScoreRoute)