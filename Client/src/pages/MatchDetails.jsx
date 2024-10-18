// MatchDetails.jsx (Detailed Match Page)

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetFlag from "../components/GetFlag";

const MatchDetails = () => {
  const { matchKey } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [firstBat, setFirstBat] = useState(null);
  const [secondBat, setSecondBat] = useState(null);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const fetchMatchDetails = async () => {
    try {
      const response = await fetch(
        `/api/v5/cricket/${projectKey}/match/${matchKey}/`,
        {
          method: "GET",
          headers: {
            "rs-token": sessionStorage.getItem("access_token"),
          },
        }
      );
      const data = await response.json();
      setMatchDetails(data);

      if (data.data.status !== "not_started") {
        if (data.data.play.first_batting === "a") {
          setTeamA(data.data.teams.a.name);
          setTeamB(data.data.teams.b.name);
          setFirstBat("a");
          setSecondBat("b");
        } else {
          setTeamA(data.data.teams.b.name);
          setTeamB(data.data.teams.a.name);
          setFirstBat("b");
          setSecondBat("a");
        }
      } else {
        setTeamA(data.data.teams.a.name);
        setTeamB(data.data.teams.b.name);
        setFirstBat("a");
        setSecondBat("b");
      }
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  useEffect(() => {
    fetchMatchDetails();
  }, [matchKey]);

  return (
    <div className="min-h-[80vh] container mx-auto p-4">
      {matchDetails ? (
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl m-[5%] mx-auto p-4 flex flex-col gap-1 items-center justify-center">
          <p className="text-xs font-bold text-gray-500 self-start">
            {new Date(matchDetails.data.start_at * 1000).toLocaleString()}
          </p>
          <h1 className="text-md sm:text-lg font-bold text-center">
            {matchDetails.data.title}
          </h1>
          <h1>{matchDetails.data.name}</h1>
          <div className="w-full flex items-center justify-center p-3">
            <div className="flex-1 flex flex-col items-center justify-center gap-0">
              <GetFlag
                country_code={matchDetails.data.teams[firstBat].country_code}
              />
              <p className="text-xs sm:text-sm sm:text-md">{teamA}</p>
              {matchDetails.data.status !== "not_started" && (
                <p>
                  {matchDetails.data.play.innings[`${firstBat}_1`].score_str}
                </p>
              )}
            </div>
            <p className="w-fit h-fit">vs</p>
            <div className="flex-1 flex flex-col items-center justify-center gap-0">
              <GetFlag
                country_code={matchDetails.data.teams[secondBat].country_code}
              />
              <p className="text-xs sm:text-sm sm:text-md">{teamB}</p>
              {matchDetails.data.status !== "not_started" && (
                <p>
                  {matchDetails.data.play.innings[`${secondBat}_1`].score_str}
                </p>
              )}
            </div>
          </div>
          {matchDetails.data.status !== "not_started" && (
            <p className="text-sm sm:text-md text-gray-500 font-semibold text-center">
              {matchDetails.data.teams[matchDetails.data.toss.winner].name} won
              the toss and Chose to {matchDetails.data.toss.elected}
            </p>
          )}
          {matchDetails.data.status !== "started" &&
            matchDetails.data.status !== "not_started" && (
              <p className="text-sm sm:text-md font-semibold text-center">
                {matchDetails.data.play.result.msg}
              </p>
            )}

          <p className="text-sm text-gray-500 sm:text-md font-semibold text-center">
            {matchDetails.data.venue.name}
          </p>

          <div className="playing-xi-container">
            <h2 className="font-bold">
                Playing XI
            </h2>
            
          </div>
        </div>
      ) : (
        <p>Loading match details...</p>
      )}
    </div>
  );
};

export default MatchDetails;
