import React, { useState } from "react";
import Header from "../components/Header";
import { storage } from "../utilities/firebase";
import { ref, uploadBytes } from "firebase/storage";
import HorizontalLinearStepper from "../components/Stepper";
import { Col, Row, Card } from "react-bootstrap";
import IOSSlider from "../components/IOSSlider";
import { DropzoneArea } from 'material-ui-dropzone';

const NewItemPage = () => {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();
    const storageRef = ref(storage, `/images/${file.name}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  }

  return (
    <div>
      <Header />
      <div>
        <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={(files) => console.log('Files:', files)}
        />
      </div>
      <form onSubmit={handleUpload}>
        <div className="file-upload-box">
          <Card style={{ width: "auto" }}>
            <input
              className="form-control form-control-lg"
              type="file"
              onChange={handleChange}
            />
          </Card>
        </div>
        <button disabled={!file}>upload to firebase</button>
      </form>
      <img src={url} alt="" />
      <IOSSlider />
      <IOSSlider />
      <IOSSlider />
      <HorizontalLinearStepper />
    </div>
  );
};

export default NewItemPage;
