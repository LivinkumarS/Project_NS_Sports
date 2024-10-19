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
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots:false,
        },
      },
    ],
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
      <div className="w-[full] z-0 bg-[#0077b6] rounded-md">
        {loading ? (
          <h1 className="text-white font-semibold p-5">
            Loading matches...{` `}
            <Spinner
              size="sm"
              color="warning"
              aria-label="Warning spinner example"
            />
          </h1>
        ) : matches.length > 0 ? (
          <div className="w-full mx-auto p-3 sm:p-7 sm:px-10 rounded-lg">
            <Slider {...settings}>
              {
                matches.map((mat,ind)=>(
                  <Link to={`/live/${mat.key}`} key={ind} className="rounded-md flex w-fit h-[300px] overflow-y-auto sm:mx-4 flex-col gap-0 bg-white p-3 sm:gap-1 sm:p-0 items-center justify-center bg-transparent">
                    <LiveMatch matchKey={mat.key}/>
                  </Link>
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
