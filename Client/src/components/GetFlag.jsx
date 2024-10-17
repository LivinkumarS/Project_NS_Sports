import React, { useEffect, useState } from "react";
import wi from "../assets/images/wi.webp";

export default function GetFlag({ country_code }) {
  const [teamFlag, setTeamFlag] = useState(null);
  const projectKey = "RS_P_1845764058746327073";
  const apiKey = "RS5:d024f19ab0ae9cac2d57af2c0317f5bb";

  const fetchFlag = async () => {
    if (country_code === "WIN" || !country_code) {
      setTeamFlag("WIN");
      return;
    }
    try {
      const response = await fetch(
        `/api/v5/cricket/${projectKey}/country/${country_code}/flags/`,
        {
          method: "GET",
          headers: {
            "rs-token": sessionStorage.getItem("access_token"),
          },
        }
      );

      const data = await response.text();
      setTeamFlag(data);
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  useEffect(() => {
    fetchFlag();
  }, []);

  return (
    <div>
      {teamFlag !== "WIN" ? (
        <div
          className="w-20 h-auto shadow-lg mb-2"
          dangerouslySetInnerHTML={{ __html: teamFlag }}
        />
      ) : (
        <img className="mb-2" src={`${wi}`} width="70" />
      )}
    </div>
  );
}
