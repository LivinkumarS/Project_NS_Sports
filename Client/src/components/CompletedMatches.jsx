import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetFlag from "./GetFlag";

export default function FeaturedMatches() {
  const [matches, setMatches] = useState([]);
  const projectKey = "RS_P_1845764058746327073";
  const apiKey = "RS5:d024f19ab0ae9cac2d57af2c0317f5bb";
  const [loading, setLoading] = useState(true);

  const fetchFeaturedMatches = async () => {
    try {
      const response = await fetch(
        `/api/v5/cricket/${projectKey}/featured-matches-2/`,
        {
          method: "GET",
          headers: {
            "rs-token": sessionStorage.getItem("access_token"),
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const fMatches = data.data.matches.filter((match) => {
          return (
            match.teams.a.country_code &&
            match.teams.b.country_code &&
            match.status === "completed"
          );
        });

        setMatches(fMatches);
        setLoading(false);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    fetchFeaturedMatches();
  }, []);

  return (
    <div className="w-full pt-10 grid grid-cols-1 xl:grid-cols-2 gap-1 bg-white">
      {loading ? (
        <p className="p-4">
          Loading matches...{` `}
          <Spinner
            size="sm"
            color="warning"
            aria-label="Warning spinner example"
          />
        </p>
      ) : matches.length > 0 ? (
        matches.map((match) => (
          <Link to={`/match/${match.key}`} key={match.key}>
            <div
              className="flex flex-col p-5 gap-1 rounded-lg border border-gray-200 bg-white shadow-md"
              key={match.key}
            >
              <div className="top-0 right-0 w-full h-fit flex items-center justify-center p-3">
                <div className="flex-1 w-2 flex flex-col items-center justify-center gap-0">
                  <GetFlag country_code={match.teams.a.country_code} />
                </div>
                <p className="w-fit h-fit">vs</p>
                <div className="flex-1 w-2 flex flex-col items-center justify-center gap-0">
                  <GetFlag country_code={match.teams.b.country_code} />
                </div>
              </div>

              <h1 className="text-xl text-center font-bold">
                {match.tournament.name}{" "}
                <span className="text-sm text-gray-500 font-semibold">
                  ({match.format.toUpperCase()})
                </span>
              </h1>
              <h2 className="text-md text-start m-0 font-bold">{match.name}</h2>
              <p>
                <span className="font-bold">Venue: </span>
                {match.venue.name}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <p>No featured matches available.</p>
      )}
    </div>
  );
}
