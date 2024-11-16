import React, { useState } from "react";
import { TextInput, Textarea, Button, Alert, Progress } from "flowbite-react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateVideo() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoURL, setVideoURL] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const apiURL = import.meta.env.VITE_API_URL;

  async function handleVideoUpload() {
    if (!videoFile) return;

    console.log("Uploading video...");

    const storage = getStorage();
    const fileName = new Date().getTime() + videoFile.name;
    const storageRef = ref(storage, `videos/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, videoFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setErrorMessage("File Size Must Be Under 25MB");
        setUploadProgress(0);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Upload successful, video URL: ", downloadURL);
          setVideoURL(downloadURL);
          setFormData({ ...formData, videoURL: downloadURL });
          setUploadProgress(100);
        });
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.description ||
      !formData.videoURL ||
      !currentUser
    ) {
      setErrorMessage("All fields are required!");
      return;
    }

    try {
      const res = await fetch(`${apiURL}/api/video/createVideo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          ...formData,
          authorName: currentUser.username,
        }),
      });

      const data = await res.json();
      if (res.ok && data) {
        console.log("Video post created successfully");
        navigate(`/video-post/${data.video.slug}`);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error uploading video.");
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="font-bold text-center my-7 text-4xl text-[#0077b6]">
        Upload Video
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <TextInput
          id="title"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Textarea
          id="description"
          placeholder="Description"
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <div className="flex gap-4">
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideoFile(e.target.files[0])}
            className="flex-1"
          />
          <Button
            type="button"
            onClick={handleVideoUpload}
            disabled={!videoFile || uploadProgress > 0}
          >
            {uploadProgress > 0 && uploadProgress < 100
              ? "Uploading..."
              : "Upload Video"}
          </Button>
        </div>
        {uploadProgress > 0 && (
          <Progress progress={uploadProgress} color="blue" />
        )}
        {errorMessage && <Alert color="failure">{errorMessage}</Alert>}
        <Button type="submit" disabled={uploadProgress < 100}>
          Submit
        </Button>
      </form>
    </div>
  );
}
