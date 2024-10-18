import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import GetFlag from "./GetFlag";

export default function LiveMatch({ matchKey }) {
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

      if (data.data.play && data.data.play.first_batting === "a") {
        setTeamA(data.data.teams.a.code);
        setTeamB(data.data.teams.b.code);
        setFirstBat("a");
        setSecondBat("b");
      } else {
        setTeamA(data.data.teams.b.code);
        setTeamB(data.data.teams.a.code);
        setFirstBat("b");
        setSecondBat("a");
      }
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  useEffect(() => {
    fetchMatchDetails();
    const intervalId = setInterval(() => {
      fetchMatchDetails();
    }, 15000);

    return () => clearInterval(intervalId);
  }, []);

  return (
      matchDetails && (
        <div className="sm:p-5 sm:py-8 py-5 w-full relative ">
          <h1 className="absolute top-0 left-0 sm:top-2 sm:left-2  text-xs sm:text-sm font-bold text-red-600 flex gap-1">
            Live Match{" "}
            <span className="mt-[3px]">
              <GoDotFill />
            </span>
          </h1>
          <h1 className="text-center text-md sm:text-xl font-bold">
            {matchDetails.data.tournament.name}
          </h1>
          <h1 className="text-center text-sm sm:text-md font-bold ">
            {matchDetails.data.name}
          </h1>
          <div className="w-full flex items-stretch justify-center p-3">
            <div className="flex-1 flex flex-col items-center justify-center gap-0">
              <GetFlag
                country_code={matchDetails.data.teams[firstBat].country_code}
              />
              <h1 className="text-center text-sm sm:text-md font-bold ">
                {teamA}
              </h1>
              {matchDetails.data.play ? (
                <p className="text-sm font-semibold">
                  {matchDetails.data.play.innings[`${firstBat}_1`].score_str}
                </p>
              ) : (
                <p className="text-sm font-semibold">Yet To Bat</p>
              )}
            </div>
            <p className="w-fit h-fit">vs</p>
            <div className="flex-1 flex flex-col items-center justify-center gap-0">
              <GetFlag
                country_code={matchDetails.data.teams[secondBat].country_code}
              />
              <h1 className="text-center text-sm sm:text-md font-bold ">
                {teamB}
              </h1>
              {matchDetails.data.play ? (
                <p className="text-sm font-semibold">
                  {matchDetails.data.play.innings[`${secondBat}_1`].score_str}
                </p>
              ) : (
                <p className="text-sm font-semibold">Yet to Bat</p>
              )}
            </div>
          </div>
          {matchDetails.data.play ? null : (
            <h1 className="text-center text-sm sm:text-md font-bold">
              Expected Start At {new Date(matchDetails.data.expected_start_at * 1000).toLocaleTimeString()}
            </h1>
          )}

          <h1 className="text-center text-sm sm:text-md font-bold">
            {matchDetails.data.venue.name}
          </h1>
        </div>
      )
  );
}
