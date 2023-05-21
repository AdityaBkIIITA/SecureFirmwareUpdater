import React, { useState ,useEffect} from "react";
import crypto from "crypto-browserify";
// const crypto =require("crypto-browserify")
import sjcl from 'sjcl';
import "./Challenges.css";
import { useFile } from "../../context/index";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Alert } from "bootstrap";

const Challenges = ({ challenges, PUF, ipfs, user }) => {

  console.log(challenges);

  const sha256=(message)=>{
    const myString = message;
    const myBitArray = sjcl.hash.sha256.hash(myString)
    const myHash = sjcl.codec.hex.fromBits(myBitArray)
    // console.log(myHash);
    return myHash;
  }


  const {
    fileData,
    addFileFunction,
    isAdminFunction,
    signInFunction,
    signUpFunction,
    newDownloadByUserFunction,
    adminAddFunction,
    filesUploadedbyAdmin,
    filesdownloadedbyUser,
  } = useFile();

  const pufKey = PUF;

  const op1=sha256(challenges[0] + pufKey);
  const op2=sha256(challenges[1] + pufKey);
  const op3=sha256(challenges[2] + pufKey);

  const [response1, setresponse1] = useState(op1);
  const [response2, setresponse2] = useState(op2);
  const [response3, setresponse3] = useState(op3);
  const [Url,setUrl]=useState();

  useEffect(()=>{
    console.log(PUF);
    console.log("1:",op1);
    console.log("2:",op2);
    console.log("3:",op3);
  },[])

const download=async()=>{
  const baseURL = `https://gateway.pinata.cloud/ipfs/`;
    const URL = `${baseURL}${ipfs}`;
    setUrl(URL);
    // downloadFun(URL);
    console.log("before");
    const data = await newDownloadByUserFunction(user[3], ipfs);
    // console.log(data.receipt);

    if (data.receipt) {
      console.log("test: ", URL);
      window.location.replace(URL);
    }
}
  const handleSubmit = (event) => {
    event.preventDefault();

    // console.log(pufKey);

    if (
      op1 == response1 &&
      op2 == response2 &&
      op3 == response3
    ) {
      console.log("Correct");
      download();
    } else {
      // console.log("Please try again..");
      alert("Please try again..");
    }
  };

  const func1 = (event) => {
    setresponse1(event.target.value);
  };

  const func2 = (event) => {
    setresponse2(event.target.value);
  };

  const func3 = (event) => {
    setresponse3(event.target.value);
  };
  const handleDownloadAllChallenges = () => {
    const challengesText = challenges.join("\n");
    const blob = new Blob([challengesText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "challenges.txt";
    link.click();
  };

  const handleUploadResponseFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const contents = event.target.result;
      const uploadedResponses = contents.split("\n").filter((response) => response.trim() !== "");
      console.log("Uploaded Responses:", uploadedResponses);
      // Perform any processing or validation with the uploaded responses
    };

    reader.readAsText(file);
  };
  return (
    <MDBContainer style={{ maxWidth: "1200px" }}>
      <MDBCard
        className="bg-white my-5 mx-auto"
        style={{ borderRadius: "1rem", maxWidth: "1000px" }}
      >
        <MDBCardBody className="p-5 w-100 d-flex flex-column">
          <h2 className="fw-bold mb-2 text-center ">PUF Authentication</h2>

          {challenges.map((challenge, index) => (
    <MDBRow className="mb-5" key={index}>
      <MDBCol className="challengeBox" style={{ backgroundColor: "#D4ADFC" }}>

        <h4 className="mb-2 text-center">Challenge {index+1}</h4>
      </MDBCol>
      <MDBCol className="challengeBox ">
        <h4 className="mb-2 text-center">{challenge}</h4>
      </MDBCol>
    </MDBRow>
  ))}
          
<MDBRow className="mb-3">

<MDBCol>
<button
className="btn btn-primary"
                onClick={handleDownloadAllChallenges}>
            Download Challenges
          </button>
</MDBCol>
        <MDBCol>
  <button
    className="btn btn-primary"
    onClick={() => document.getElementById("uploadResponseFile").click()}
  >
    Upload Responses
  </button>
  <input
    type="file"
    id="uploadResponseFile"
    accept=".txt"
    onChange={handleUploadResponseFile}
    style={{ display: "none" }}
  />
</MDBCol>

      </MDBRow>

        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default Challenges;