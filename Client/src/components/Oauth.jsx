import React from "react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Oath() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = getAuth(app);
  const apiURL = import.meta.env.VITE_API_URL;

  async function handleOuthClick() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
  
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      console.log("Google Sign-in result:", resultsFromGoogle);
  
      const res = await fetch(`${apiURL}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          profilePhoto: resultsFromGoogle.user.photoURL,
        }),
      });
  
      if (!res.ok) {
        console.error("API error:", await res.json());
        return;
      }
  
      const data = await res.json();
      const { token, ...signData } = data;
      dispatch(signInSuccess(signData));
      localStorage.setItem("access_token", token);
      navigate("/");
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        console.log("Sign-in popup was closed by the user.");
      } else {
        console.error("Error during Google sign-in:", error);
      }
    }
  }
  
  
  return (
    <div
      onClick={handleOuthClick}
      className="cursor-pointer flex items-center justify-center w-full mb-5 px-4 py-2 text-white bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      <span className="text-gray-700 font-semibold">Sign in with Google</span>
    </div>
  );
}
