import React from 'react';
import { Alert, Button } from 'flowbite-react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function BlogRequest() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f9ff] p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h1 className="text-3xl font-semibold text-[#0077b6] mb-2">
          Request Sent Successfully!
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Your blog post request has been successfully submitted. The admin will review and approve it soon.
        </p>

        <Button
          className="w-full sm:w-auto bg-[#0077b6] text-white px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300"
          onClick={handleRedirect}
        >
          Back to Home
        </Button>

        <Alert color="blue" className="mt-6 w-full">
          <p className="text-sm text-gray-700">
            Your request has been submitted for review. It will be processed by the admin shortly.
          </p>
        </Alert>
      </div>
    </div>
  );
}
