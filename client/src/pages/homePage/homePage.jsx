import { useState } from "react";
import "./homePage.css";
import { Col, Container, Row, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SimpleTable from "../table/SimpleTable";

const HomePage = ({ user,PUFhandler ,IPFSHandler}) => {
const [inputId, setInputId] = useState("");
const [adminId, setAdminId] = useState(false);
const [showTable, setShowTable] = useState(false);
const [selectedOption, setSelectedOption] = useState("");

  const onButtonClick = () => {
    console.log("Input Id is: ", inputId);
    setAdminId(true);
  };

  const UpdateButton = () => {
    setShowTable(true);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
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
      <Dropdown.Item href="#/action-1" onClick={() => setSelectedOption('Device 1')}>Device 1</Dropdown.Item>
      <Dropdown.Item href="#/action-2" onClick={() => setSelectedOption('Device 2')}>Device 2</Dropdown.Item>
      <Dropdown.Item href="#/action-3" onClick={() => setSelectedOption('Device 3')}>Device 3</Dropdown.Item>
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
        {showTable && <SimpleTable user={user} PUFhandler={PUFhandler} IPFSHandler={IPFSHandler}/>}
      </Container>
    </>
  );
};

export default HomePage;
