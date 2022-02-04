// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, push, set } from "firebase/database";
import { getStorage } from "firebase/storage";
import { useState, useEffect } from "react";
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	onIdTokenChanged,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyCfeRQeiyeJ9t9eAPb_lKIbsXL1yisprKY",
	authDomain: "cs349-set.firebaseapp.com",
	databaseURL: "https://cs349-set-default-rtdb.firebaseio.com",
	projectId: "cs349-set",
	storageBucket: "cs349-set.appspot.com",
	messagingSenderId: "1044183758006",
	appId: "1:1044183758006:web:e754dea6a0fb448f622217",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export const storage = getStorage(app);

export const deleteData = (path) => {
	set(ref(database, path), null)
};

export const setData = (path, value) => {
	set(ref(database, path), value)
};

export const pushData = (path, value) => {
	push(ref(database, path), value)
};

export const useData = (path, transform) => {
	const [localData, setlocalData] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	useEffect(() => {
		const dbRef = ref(database, path);
		const devMode =
			!process.env.NODE_ENV || process.env.NODE_ENV === "development";
		// if (devMode) {
		// 	console.log(`loading ${path}`);
		// }
		return onValue(
			dbRef,
			(snapshot) => {
				const val = snapshot.val();
				// if (devMode) {
				// 	console.log(val);
				// }
				setlocalData(transform ? transform(val) : val);
				setLoading(false);
				setError(null);
			},
			(error) => {
				setlocalData(null);
				setLoading(false);
				setError(error);
			}
		);
	}, [path, transform]);

	return [localData, loading, error];
};

export const getAllData = (data) => data;

export const getItemsFromUser = (userID, item) => `/${item}/${userID}`;

export const getClothingItem = (type, userID, clothingID) => {
	return `/${type}/${userID}/${clothingID}`;
};

export const getAllClothingType = (type, userID) => {
	return `/${type}/${userID}/`;
};

export const signInWithGoogle = (navigate) => {
	signInWithPopup(getAuth(app), new GoogleAuthProvider())
	.then((result) => {
		// This gives you a Google Access Token. You can use it to access the Google API.
		const credential = GoogleAuthProvider.credentialFromResult(result);
		const token = credential.accessToken;
		sessionStorage.setItem(
			"Auth Token",
			token
		);
		// The signed-in user info.
		const user = result.user;
		navigate('/closet')
	  }).catch((error) => {
		// Handle Errors here.
		const errorCode = error.code;
		const errorMessage = error.message;
		// The email of the user's account used.
		const email = error.email;
		// The AuthCredential type that was used.
		const credential = GoogleAuthProvider.credentialFromError(error);
		console.log(errorCode, errorMessage, email);
		return false;
	  });
};

const firebaseSignOut = () => signOut(getAuth(app));
export { firebaseSignOut as signOut };

export const useUserState = () => {
	const [user, setUser] = useState();

	useEffect(() => {
		onIdTokenChanged(getAuth(app), setUser);
	}, []);

	return [user];
};

export const signInWithEmailAndPassWD = (inputs, navigate, setOpenAlert) => {
	const authentication = getAuth(app);
	signInWithEmailAndPassword(authentication, inputs.email, inputs.password)
		.then((response) => {
			sessionStorage.setItem(
				"Auth Token",
				response._tokenResponse.refreshToken
			);
			navigate('/closet');
		})
		.catch((error) => {
			if (error.code == "auth/user-not-found" ||
				error.code == "auth/wrong-password") {
					setOpenAlert(true);
				} else {
					console.log(error.code);
				}
		});
};
