import { useState } from "react";
import "./homePage.css";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import { useFile } from "../../context/index";
import "bootstrap/dist/css/bootstrap.min.css";
import SimpleTable from "../table/SimpleTable";
import { ToastContainer, toast } from "react-toastify";

const HomePage = ({ user,PUFhandler ,IPFSHandler}) => {
const [inputId, setInputId] = useState("");
const [adminId, setAdminId] = useState(false);
const [showTable, setShowTable] = useState(false);
const [selectedOption, setSelectedOption] = useState("");
const [devices, setDevices] = useState([]);
const [fileData, setFileData] = useState([]);
const {
    address,
    contract,
    connect,
    addFileFunction,
    isAdminFunction,
    signInFunction,
    signUpFunction,
    newDownloadByUserFunction,
    adminAddFunction,
    filesUploadedbyAdmin,
    filesdownloadedbyUser,
    addDevices,
    getFilesByDeviceId,
    getDevicesByMId,
    fileDataforManufacture,
    fileDataForDevice
  } = useFile();


  const onButtonClick = async () => {
  console.log("Input Id is: ", inputId);
  setAdminId(true);

  if (inputId) {
    const result = await getDevicesByMId(inputId);
    console.log(result);
    setDevices(result);

    if (result.length === 0) {
      toast.error("Wrong manufacturer ID");
      setInputId(""); // Clear the input field
      setAdminId(false);
    }
  }
};



  const UpdateButton = () => {
    setShowTable(true);
    const files = getFilesByDeviceId(selectedOption);
    setFileData(files);

  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
      <Container>
      <div className="head">Welcome to our file download page!</div>
          <div className="para">
            Here, you can securely download the firmware files you need for your
            devices. We understand the importance of having the latest and most
            secure versions of firmware files, which is why we have made it easy
            for you to access them.
          </div>
        <div className="searchbox">
  <div className="row">
    <div className="col">
      <div className="form-group manuFacturField" >
        <input
          className="form-control form-control-lg"
          type="text"
          placeholder="Enter Manufacturer Id"
          onChange={(e) => setInputId(e.target.value)}
          value={inputId}
        />
      </div>
    </div>
    <div className="col-auto searchField">
      <button type="button" class="btn btn-primary btn-lg" onClick={onButtonClick}>
        Search
      </button>
    </div>
  </div>
</div>

          {adminId && (
            <div className="flex-container">
              <div className="flex-item">
  <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic" selected={selectedOption}>
      {selectedOption ? selectedOption : 'Select Device'}
    </Dropdown.Toggle>
    <Dropdown.Menu>
    {devices.map((device) => (
      <Dropdown.Item key={device.id} onClick={() => setSelectedOption(device.name)}>
      {device.name}
      </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
</div>

<div className="flex-item">
<button type="button" onClick={UpdateButton}>
                  View Updates
                </button>
              </div>
            </div>
          )}
        {showTable && (
  <SimpleTable
    fileData={fileData}
    user={user}
    PUFhandler={PUFhandler}
    IPFSHandler={IPFSHandler}
  />
)}

      </Container>
    </>
  );
};

export default HomePage;
