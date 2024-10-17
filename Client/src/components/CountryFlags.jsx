import React, { useEffect, useState } from "react";
import GetFlag from "./GetFlag";

export default function CountryFlags() {
  const projectKey = "RS_P_1845764058746327073";
  const apiKey = "RS5:d024f19ab0ae9cac2d57af2c0317f5bb";

  
const countries = [
    "IND",
    "AUS", 
    "ENG", 
    "ZAF",
    "NZL",
    "PAK",
    "LKA",
    "BGD",
    "AFG",
    "WIN",
    "ZWE", 
    "IRL",
    "NLD", 
    // "SCO",
    "NAM", 
    "ARE",
    "NPL"
  ];

  return (
    <div className="w-full max-w-3xl mx-auto h-20 p-4 flex items-center justify-start overflow-x-auto overflow-y-hidden gap-4 bg-white">
      {countries.map((coun,index)=>(
            <GetFlag key={index} country_code={coun}/>
        ))}
    </div>
  );
}
