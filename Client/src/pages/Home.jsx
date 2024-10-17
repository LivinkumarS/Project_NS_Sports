import React, { useEffect, useState } from "react";
import LiveMatches from "../components/LiveMatches";
import { GoDotFill } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import CompletedMatches from "../components/CompletedMatches";
import UpcomingMatches from "../components/UpcomingMatches";

const Home = () => {
  const location = useLocation();
  const projectKey = "RS_P_1845764058746327073";
  const apiKey = "RS5:d024f19ab0ae9cac2d57af2c0317f5bb";
  const [key, setKey] = useState(null);
  const [liveMatches, setLiveMatches] = useState([]);

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

        setLiveMatches(liveMatches);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  };

  useEffect(() => {
    const path = new URLSearchParams(location.search);
    if (path.has("tab")) {
      setKey(path.get("tab"));
    } else {
      setKey(null);
    }
  }, [location.search]);

  useEffect(() => {
    fetchFeaturedMatches();
  }, []);

  return (
    <div className="w-full px-5 min-h-[80vh]">
      <div className="sm:mt-4 flex w-full flex-col gap-3 sm:gap-0 sm:items-start justify-center items-center sm:flex-row ">
        <div className="w-full mb-8">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between">
            <div className="flex w-full overflow-x-auto gap-0 justify-start items-center space-x-8 mt-4 mb-4">
              <Link to={"/"}>
                <h1 className="text-2xl font-bold text-red-600 flex gap-1 mb-2 whitespace-nowrap">
                  Live Matches{" "}
                  <span className="mt-2">
                    <GoDotFill />
                  </span>
                </h1>
              </Link>
              <div className="flex items-center justify-start gap-2 sm:gap-4">
                {liveMatches.map((match, index) => (
                  <Link
                    to={`/live/${match.key}`}
                    key={index}
                    className="text-black font-semibold p-2 px-3 bg-red-300 rounded-3xl text-xs lg:text-sm hover:bg-gray-300  whitespace-nowrap flex items-center gap-2"
                  >
                    {match.short_name}
                  </Link>
                ))}
              </div>  
            </div>
            <div className="w-[90%] sm:w-[200px] sm:gap-4 mb-5 flex gap-4 items-center justify-center">
              <Link to={"/?tab=completed"} className="flex-1">
                <button className={`${key==='completed'? 'bg-red-300 ': 'bg-white'} w-full text-sm sm:text-md p-2 rounded-xl hover:bg-red-300 cursor-pointer hover:text-white font-bold`}>
                  Completed
                </button>
              </Link>
              <Link to={"/?tab=upcoming"} className="flex-1">
                <button className={`${key==='upcoming'? 'bg-red-300 ': 'bg-white'} w-full text-sm sm:text-md p-2 rounded-xl hover:bg-red-300 cursor-pointer hover:text-white font-bold`}>
                  Upcoming
                </button>
              </Link>
            </div>
          </div>
          <div className="container mx-auto  sm:p-4 h-fit">
            {!key ? (
              <LiveMatches />
            ) : key == "completed" ? (
              <CompletedMatches/>
            ) : (
              <UpcomingMatches/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
