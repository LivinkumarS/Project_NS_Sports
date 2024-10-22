import React, { useEffect, useState } from "react";
import TourMatch from "./TourMatch";

export default function Tournament({ tourKey }) {
  const [tourDetail, setTourDetail] = useState(null);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const fetchTourDetails = async () => {
    try {
      const response = await fetch(
        `/api/v5/cricket/${projectKey}/tournament/${tourKey}/`,
        {
          method: "GET",
          headers: {
            "rs-token": sessionStorage.getItem("access_token"),
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTourDetail(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  useEffect(() => {
    fetchTourDetails();
  }, []);
  return (
    tourDetail && (
      <div className="mb-1">
        <h3 className="w-full px-6 py-3 text-sm sm:text-lg bg-blue-200 text-center">
          {tourDetail.data.tournament.name}
        </h3>

        <table className="min-w-full text-sm text-left text-gray-500">
          <tbody>
            {tourDetail.data.rounds[0].groups[0].match_keys.map(
              (match, ind) => (
                <TourMatch matchKey={match} key={ind} />
              )
            )}
          </tbody>
        </table>
      </div>
    )
  );
}
