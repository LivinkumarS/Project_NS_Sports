import { Alert, Button, FileInput, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Progress } from "flowbite-react";
import { app } from "../firebase";
import {
  ref,
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { BiError } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreatePost() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imageUploadingProgress, setImageUploadingProgress] = useState(0);
  const [imageFileURL, setImageFileURL] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const apiURL = import.meta.env.VITE_API_URL;

  async function handleUploadImage() {
    if (!imageFile) return;

    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, `blogImages/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setErrorMessage("File Size Must Be Under 25MB");
        setImageUploadingProgress(0);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileURL(downloadURL);
          setFormData({ ...formData, image: downloadURL });
          setImageUploadingProgress(100);
        });
      }
    );
  }

  async function handlePostSubmit(e) {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.title || !formData.content || !formData.image) {
      return setErrorMessage("All Fields Are Required!");
    }

    try {
      const res = await fetch(`${apiURL}/api/blog/create`, {
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

      const response = await res.json();
      if (res.ok) {
        navigate(`/blog-post/${response.slug}`);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred while submitting your post.");
    }
  }

  useEffect(() => {
    if (!currentUser) {
      navigate("/sign-in");
    }
  }, [currentUser]);

  return (
    <div className="p-6 max-w-4xl min-h-screen mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="font-bold text-center my-7 text-4xl text-[#0077b6]">
        Create Blog Post
      </h1>
      <form className="flex flex-col gap-6" onSubmit={handlePostSubmit}>
        <TextInput
          id="title"
          type="text"
          placeholder="Title"
          className="border-[#0077b6] focus:ring-[#0077b6]"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <div className="flex flex-col sm:flex-row gap-6 border-2 border-dashed border-[#0077b6] p-4 rounded-lg">
          <FileInput
            type="file"
            accept="image/*"
            className="flex-1"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <Button
            type="button"
            style={{ backgroundColor: "#0077b6" }}
            className="text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
            onClick={handleUploadImage}
            disabled={!imageFile || imageUploadingProgress > 0}
          >
            {imageUploadingProgress > 0 && imageUploadingProgress < 100
              ? "Uploading..."
              : "Upload Image"}
          </Button>
        </div>
        {imageUploadingProgress > 0 && (
          <Progress progress={imageUploadingProgress} color="blue" />
        )}
        {imageFileURL && (
          <div className="w-auto h-[200px] mx-auto mt-4 relative rounded-lg overflow-hidden">
            <img
              src={imageFileURL}
              alt="Post Image"
              onClick={() => {
                setImageFileURL(null);
                setImageFile(null);
                setImageUploadingProgress(0);
              }}
              className="w-full h-full cursor-pointer"
            />
          </div>
        )}

        <ReactQuill
          id="content"
          theme="snow"
          className="min-h-[100px] rounded-lg"
          placeholder="Write your post content here..."
          value={formData.content}
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <Button
          type="submit"
          className="w-full mx-auto text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105"
          disabled={imageUploadingProgress > 0 && imageUploadingProgress < 100}
        >
          Submit Post
        </Button>
      </form>
      {errorMessage && (
        <Alert color="red" className="mt-6" icon={BiError}>
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}