import React, { useEffect, useState } from "react";
import { Carousel, Spinner } from "flowbite-react";
import GetFlag from "./GetFlag";
import { Link } from "react-router-dom";
import { GoDotFill } from "react-icons/go";
import LiveMatch from "./LiveMatch";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LiveMatches() {
  const [matches, setMatches] = useState([]);
  const projectKey = import.meta.env.VITE_PROJECT_KEY;
  const [loading, setLoading] = useState(true);
  

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
          <div className="w-full mx-auto max-w-4xl p-3 sm:p-7 sm:px-10 rounded-lg bg-[#0077b6]">
            <Slider {...settings}>
              {
                matches.map((mat,ind)=>(
                  <LiveMatch matchKey={mat.key} key={ind}/>
                ))
              }
            </Slider>
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
