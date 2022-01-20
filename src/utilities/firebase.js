// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
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

// This is a hardcoded test user id
export const userId = "C0XdX2OmOQZKzVknueo4xGtsgvI2";

export const setData = (path, value) => set(ref(database, path), value);

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

export const getTopsFromUser = (userID) => `/Tops/${userID}`;
export const getBottomsFromUser = (userID) => `/Bottoms/${userID}`;
export const getAccessoriesFromUser = (userID) => `/Accessories/${userID}`;
export const getShoesFromUser = (userID) => `/Shoes/${userID}`;

export const getOutfitsFromUser = (userID) => `/Saved Outfits/${userID}`;

export const getClothingItem = (type, userID, clothingID) => {
	return `/${type}/${userID}/${clothingID}`;
};

export const signInWithGoogle = () => {
	signInWithPopup(getAuth(app), new GoogleAuthProvider());
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

export const signInWithEmailAndPassWD = (inputs) => {
	const authentication = getAuth(app);
	signInWithEmailAndPassword(authentication, inputs.email, inputs.password)
		.then((response) => {
			sessionStorage.setItem(
				"Auth Token",
				response._tokenResponse.refreshToken
			);
			return true;
		})
		.catch((error) => {
			if (
				error.code === "auth/wrong-password" ||
				error.code === "auth/user-not-found"
			) {
				return false;
			}
		});
};
