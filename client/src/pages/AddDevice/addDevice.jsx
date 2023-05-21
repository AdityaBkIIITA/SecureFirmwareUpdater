import React, { useState } from "react";
// import "./addDevice.css";
import { ToastContainer, toast } from "react-toastify";
const AddDevice = ({ isAdmin }) => {
  const [deviceId, setDeviceId] = useState("");
  const [challengeFile, setChallengeFile] = useState(null);
  const [responseFile, setResponseFile] = useState(null);
  const [isDeviceAdded, setIsDeviceAdded] = useState(false);
  const [isUploadFile, setIsUploadFile] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState(null);

  // Function to handle form submission
  const handleSubmit = (event) => {

    const isFormComplete = deviceId !== "" && challengeFile !== null && responseFile !== null;
    console.log(isFormComplete);
    if(isFormComplete){
      console.log("Successful");
    } else{
      toast("Fill all Field");
      event.preventDefault();
    }
};

  const handleDeviceIdChange = (e) => {
    setDeviceId(e.target.value);
  };

  const handleChallengeFileChange = (e) => {
    const file = e.target.files[0];
    setChallengeFile(file);
  };

  const handleResponseFileChange = (e) => {
    const file = e.target.files[0];
    setResponseFile(file);
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    setIsDeviceAdded(false);
    setIsUploadFile(true);
  };

  // Check if all entries are made

  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ToastContainer />
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter Device ID:</label>
          <input type="text" value={deviceId} onChange={handleDeviceIdChange} />
        </div>
        <div className="upload-group">
          <label>Upload Challenge:</label>
          <input type="file" onChange={handleChallengeFileChange} accept=".txt" />
        </div>
        <div className="upload-group">
          <label>Upload Response:</label>
          <input type="file" onChange={handleResponseFileChange} accept=".txt" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <style jsx>{`
         .container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 4px;
          background-color: #f9f9f9;
        }
        .form-group {
          margin-bottom: 10px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        input[type="text"] {
          width: 100%;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .upload-group {
          margin-top: 10px;
        }
        .submit-button {
          padding: 10px 20px;
          font-size: 18px;
          background-color: #007bff;
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 20px;
        }
      `}</style>
    </div>
    </>
  );
};

export default AddDevice;
