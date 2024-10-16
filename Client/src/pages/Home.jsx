import React, { useState } from "react";
import LiveMatches from "../components/LiveMatches";
import { GoDotFill } from "react-icons/go";
import CompletedMatches from "../components/CompletedMatches";
import UpcomingMatches from "../components/UpcomingMatches";
import { Button } from "flowbite-react";

const Home = () => {
  const [content, setContent] = useState(1);

  return (
    <div className="w-full md:container mx-auto p-4 min-h-[80vh]">
      <div className="flex-1 sm:mt-4 flex flex-col gap-3 sm:gap-0 sm:items-start justify-center items-center sm:flex-row ">
        <div className="flex-1 sm:w-[50%]">
          <h1 className="text-2xl font-bold text-red-600 flex gap-1">
            Live Matches{" "}
            <span className="mt-2">
              <GoDotFill />
            </span>
          </h1>
          <div className="container mx-auto  sm:p-4 h-fit">
            <LiveMatches />
          </div>
        </div>
        <div className="flex-1 sm:w-[50%]">
          <div className="flex w-full">
            <button
              className={`flex-1 rounded-none text-sm font-semibold bg-white p-3 cursor-pointer ${content===0 && 'bg-red-300 text-black'}`}
              onClick={() =>
                setContent(0)
              }
            >
              Completed Matches
            </button>
            <button
              className={`flex-1 rounded-none text-sm font-semibold bg-white p-3 cursor-pointer ${content===1 && 'bg-red-300 text-black'}`}
              onClick={() =>
                setContent(1)
              }
            >
              Upcoming Matches
            </button>
          </div>
          {content===0?(<CompletedMatches />):(<UpcomingMatches/>)}
        </div>
      </div>
      {/* <h1 className="text-2xl font-bold mb-4">Completed Matches</h1>
      <CompletedMatches />
      <br />
      <h1 className="text-2xl font-bold mb-4">Upcoming Matches</h1>
      <FeaUpcomingMatches /> */}
    </div>
  );
};

export default Home;
