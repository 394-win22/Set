import React, { useState } from "react";
import Header from "../components/Header";
import { storage } from "../utilities/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { DropzoneArea } from 'material-ui-dropzone';
import {
	Button,
	Col,
	Container,
	Row
} from "react-bootstrap";
import {NewItemForm} from '../components/NewItemForm'

const NewItemPage = () => {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
  const [type, setType] = useState("Tops");

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload({blobUrl, name}) {
    if (!blobUrl || !name) return null;
    const blob = fetch(blobUrl).then((r) => r.blob())
    const storageRef = ref(storage, `/images/${name}`);
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  }

  return (
    <div>
      <Header />
      <Container>
      {/* <div>
        <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            filesLimit={1}
            // onChange={(files) => handleUpload({
            //     blobUrl: URL.createObjectURL(files[0]),
            //     name: `${file.name}_${Date.now()}`
            //   })}
        />
      </div> */}
      <NewItemForm/>
      </Container>
    </div>
  );
};

export default NewItemPage;
