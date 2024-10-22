import React, { useEffect, useState } from "react";

export default function Series() {
  const [orderedTours, setOrderedTours] = useState(null);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;

  const groupTournamentsByMonth = (tournaments) => {
    return tournaments.reduce((acc, tournament) => {
      const startDate = new Date(tournament.start_date * 1000);
      const month = startDate.toLocaleString("default", { month: "short" });
      const year = startDate.getFullYear();
      const monthYear = `${month}_${year}`;

      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      acc[monthYear].push(tournament);

      return acc;
    }, {});
  };

  const fetchTourList = async () => {
    try {
      const response = await fetch(
        `/api/v5/cricket/${projectKey}/featured-tournaments/`,
        {
          method: "GET",
          headers: {
            "rs-token": sessionStorage.getItem("access_token"),
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        const sortedTours = data.data.tournaments.sort((a, b) => {
          a.start_date - b.start_date;
        });
        const monthwise = groupTournamentsByMonth(sortedTours);
        setOrderedTours(monthwise);
        console.log(orderedTours);
        
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  useEffect(() => {
    fetchTourList();
  }, []);

  return (
    <div className="w-full min-h-[80vh]">
      <div className="w-full max-w-[1100px] mx-auto p-3">
        <table className="w-full">
          <tbody>
            {orderedTours &&
              Object.keys(orderedTours).forEach((key) => {
                <tr key={key}>
                  <td>{key}</td>
                  <td>
                    {orderedTours[key].map((tour, ind) => (
                      <div key={ind} className="text-xs">
                        {tour.name}
                      </div>
                    ))}
                  </td>
                </tr>;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
