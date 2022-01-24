import { storage, userId } from "../utilities/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

async function UploadOneImage(imageBlob, blobCategory, theUserID) {
    if (!imageBlob || !blobCategory || !theUserID) return null;
    const storageRef = ref(storage, `/images/${theUserID}/${blobCategory}/${Date.now()}_${imageBlob["name"]}`);
    let snapshot = await uploadBytes(storageRef, imageBlob);
    let URL = await getDownloadURL(snapshot.ref);
    return URL;
  }

  export default UploadOneImage;