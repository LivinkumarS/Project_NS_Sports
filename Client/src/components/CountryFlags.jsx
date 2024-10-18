import React, { useEffect, useState } from "react";
import GetFlag from "./GetFlag";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CountryFlags() {
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
    "NAM",
    "ARE",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white h-fit ">
      <h1 className="text-lg sm:text-xl font-bold text-center pt-2">
        Country Flags
      </h1>
      <Slider {...settings} className="h-fit pt-5">
        {countries.map((coun, index) => (
          <div className="w-fit mr-3 md:mx-3 " key={index}>
            <GetFlag key={index} country_code={coun} />
            <h1 className="text-xs font-bold text-center w-20">{coun}</h1>
          </div>
        ))}
      </Slider>
    </div>
  );
}
