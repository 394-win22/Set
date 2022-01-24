import { storage } from "../utilities/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Compress from 'compress.js';

async function UploadOneImage(imageBlob, blobCategory, theUserID) {
    if (!imageBlob || !blobCategory || !theUserID) return null;
    const compress = new Compress();
    const resizedImage = await compress.compress([imageBlob], {
        size: 2, // the max size in MB, defaults to 2MB
        quality: 1, // the quality of the image, max is 1,
        maxWidth: 600, // the max width of the output image, defaults to 1920px
        maxHeight: 800, // the max height of the output image, defaults to 1920px
        resize: true // defaults to true, set false if you do not want to resize the image width and height
      })
    const img = resizedImage[0];
    const base64str = img.data;
    const imgExt = img.ext;
    const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
    console.log(resizedFiile);
    const storageRef = ref(storage, `/images/${theUserID}/${blobCategory}/${Date.now()}_${imageBlob["name"]}`);
    let snapshot = await uploadBytes(storageRef, resizedFiile);
    let URL = await getDownloadURL(snapshot.ref);
    return URL;
  }

  export default UploadOneImage;