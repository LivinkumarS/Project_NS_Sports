import React, { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert } from "flowbite-react";
// import Oath from "../components/Oath";

export default function SignUp() {
  const [formData, setFormData] = useState({email:'',username:'',password:''});
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate=useNavigate();
  

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      setLoading(false);
      setErrorMessage("All Fields Are Required");
      return;
    }
    try {
      const res = await fetch("/server/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const response = await res.json();
      if (response.success === false) {
        setErrorMessage(response.message);
      } else {
        setErrorMessage(null);
      }
      if(res.ok){
        navigate('/sign-in');
      }
    } catch (err) {
      setErrorMessage(err.message)
    }
    setLoading(false);
    setFormData({email:'',username:'',password:''})
  }

  async function handleChange(event) {
    const data = event.target.value;
    const tar = event.target.id;
    setFormData((prev) => {
      return {
        ...prev,
        [tar]: data.trim(),
      };
    });
  }

  return (
    <div className="min-h-[85vh] my-5 sm:m-0 sm:flex sm:items-center sm:justify-center">
      <div className="gap-5 flex p-3 max-w-4xl mx-auto flex-col md:flex-row md:items-center">
        {/* left-side  */}
        <div className="flex-1">
        <Link to="/">
            <img
              src="/NS_logo.png"
              alt=""
              className="bg-[#0077b6] rounded-lg w-[70px] sm:w-[100px] h-auto p-2"
            />
          </Link>
          <p className="mt-4 font-semibold">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo repellat, voluptates hic molestias laborum obcaecati exercitationem voluptatem soluta necessitatibus aliquam optio odit iure praesentium asperiores labore quidem odio impedit repudiandae illo ex officia explicabo nostrum. Illum quo explicabo rerum magni obcaecati nam, suscipit repellendus nisi harum deserunt quasi magnam beatae?
          </p>
        </div>
        {/* right-side  */}
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="">
              <Label value="UserName" />
              <TextInput
                type="text"
                placeholder="User Name"
                id="username"
                onChange={handleChange}
                value={formData.username}
              />
            </div>
            <div className="">
              <Label value="Email" />
              <TextInput
                type="text"
                placeholder="something@hello.com"
                id="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div className="">
              <Label value="Password" />
              <TextInput
                type="password"
                placeholder="******"
                id="password"
                onChange={handleChange}
                value={formData.password}
              />
            </div>
            <Button
              className="mx-auto my-4 w-full bg-[#0077b6]"
              size="sm"
              type="submit"
              isProcessing={isLoading}
            >
              Submit
            </Button>
            <div className="gap-2 flex">
              <span>Have an account?</span>
              <Link className="text-blue-600" to="/sign-in">
                Sign In
              </Link>
            </div>
          </form>
          {errorMessage && <Alert color="red">{errorMessage}</Alert>}
        </div>
      </div>
    </div>
  );
}
