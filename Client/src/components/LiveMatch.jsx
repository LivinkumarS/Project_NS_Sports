import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import GetFlag from "./GetFlag";

export default function LiveMatch({ matchKey }) {
  const [matchDetails, setMatchDetails] = useState(null);
  const [teamA, setTeamA] = useState(null);
  const [teamB, setTeamB] = useState(null);
  const [firstBat, setFirstBat] = useState(null);
  const [secondBat, setSecondBat] = useState(null);
  const projectKey = "RS_P_1845764058746327073";
  const apiKey = "RS5:d024f19ab0ae9cac2d57af2c0317f5bb";

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
    <div className="flex flex-col gap-0 sm:gap-1 p-4 sm:p-0 h-full items-center justify-center bg-transparent">
      {matchDetails && (
        <>
          <h1 className="absolute top-1 left-1 sm:top-3 sm:left-3 text-xs sm:text-sm font-bold text-red-600 flex gap-1">
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
        </>
      )}
    </div>
  );
}
