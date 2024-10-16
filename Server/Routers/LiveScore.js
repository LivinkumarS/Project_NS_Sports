export const liveScore = (req, res, next) => {
  res.json({
    team1: "Ind",
    team2: "Pak",
    toss: "Ind",
    choose: "bowl",
    innings: 1,
    score: 110,
    overs: 13.4,
    target: null,
  });
};
