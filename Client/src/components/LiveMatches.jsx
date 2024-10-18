import React, { useEffect, useState } from "react";
import { Carousel, Spinner } from "flowbite-react";
import GetFlag from "./GetFlag";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import LiveMatch from "./LiveMatch";

export default function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
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
        const liveMatches = data.data.matches.filter((match) => {
          return match.status === "started";
        });

        setMatches(liveMatches);
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
    <>
      
      <div className="w-full z-0">
        {loading ? (
          <p>
            Loading matches...{` `}
            <Spinner
              size="sm"
              color="warning"
              aria-label="Warning spinner example"
            />
          </p>
        ) : matches.length > 0 ? (
          <div className="shadow-lg w-full max-w-3xl mx-auto h-72 sm:h-80 xl:h-80 2xl:h-96 hover:rounded-lg ease-in transition-all duration-200 hover:bg-[#d4d4d6] bg-white">
            <Carousel>
              {matches.map((match) => (
                <Link
                  key={match.key}
                  className="w-full h-full"
                  to={`/live/${match.key}`}
                >
                  <LiveMatch matchKey={match.key} />
                </Link>
              ))}
            </Carousel>
          </div>
        ) : (
          <h1 className="text-lg text-gray-500 font-semibold">
            No Live Matches...!
          </h1>
        )}
      </div>
    </>
  );
}
