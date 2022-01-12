import React, { useState } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import { storage } from '../utilities/firebase'
import { getStorage, ref, uploadBytes } from "firebase/storage";

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
            console.log('Uploaded a blob or file!');
        });
    }

    return (
    <div>
        <Header />
        <form onSubmit={handleUpload}>
            <input type="file" onChange={handleChange} />
            <button disabled={!file}>upload to firebase</button>
        </form>
        <img src={url} alt="" />
        <Footer />
    </div>
    );
}

export default NewItemPage;