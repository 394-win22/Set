// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { useState, useEffect } from "react";
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
    appId: "1:1044183758006:web:e754dea6a0fb448f622217"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// This is a hardcoded test user id
const userId = "C0XdX2OmOQZKzVknueo4xGtsgvI2"

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      const dbRef = ref(database, path);
      const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
      if (devMode) { console.log(`loading ${path}`); }
      return onValue(dbRef, (snapshot) => {
        const val = snapshot.val();
        if (devMode) { console.log(val); }
        setData(transform ? transform(val) : val);
        setLoading(false);
        setError(null);
      }, (error) => {
        setData(null);
        setLoading(false);
        setError(error);
      });
    }, [path, transform]);
  
    return [data, loading, error];
  };

export const getAllData = data => data

export const getTopsFromUser = data => ({
    tops: data.Tops[userId]
});
export const getBottomsFromUser = data => ({
    tops: data.Bottoms[userId]
});
export const getAccessoriesFromUser = data => ({
    tops: data.Accessories[userId]
});
export const getShoesFromUser = data => ({
    tops: data.Shoes[userId]
});