import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert } from "flowbite-react";

export default function VideoPost() {
  const { slug } = useParams();
  console.log(slug);
  
  const [video, setVideo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const apiURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`${apiURL}/api/video/getVideo/${slug}`);
        const data = await res.json();

        if (res.ok) {
          setVideo(data);
        } else {
          setErrorMessage(data.message || "Failed to load video.");
        }
      } catch (error) {
        setErrorMessage("An error occurred while fetching the video.");
      }
    };

    fetchVideo();
  }, [slug]);

  if (errorMessage) {
    return <Alert color="failure">{errorMessage}</Alert>;
  }

  if (!video) {
    return <div className="text-center py-6 text-xl">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-[#0077b6] mb-6 text-center">
        {video.title}
      </h1>
      <p className="text-gray-600 text-lg text-center mb-6">
        Uploaded by: {video.authorName || "Anonymous"}
      </p>
      <div className="w-full h-auto mb-6 relative rounded-lg overflow-hidden shadow-md">
        <video
          src={video.videoURL}
          controls
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <p className="text-lg leading-relaxed text-gray-800">
        {video.description}
      </p>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-[#0077b6] text-white rounded-lg shadow-md hover:bg-[#005f8c] transition-colors"
        >
          Back to Videos
        </button>
      </div>
    </div>
  );
}
