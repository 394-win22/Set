import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import RecommendPage from './pages/RecommendPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import { useData, getTopsFromUser, getAllData } from './utilities/firebase.js';

function App() {
  const [closet, loading, error] = useData('/', getAllData);
  // This is a hardcoded test user id
  const userId = "C0XdX2OmOQZKzVknueo4xGtsgvI2"
  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading closet...</h1>
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage closet={closet} userId={userId}/>} />
          <Route path="/recommend" element={<RecommendPage closet={closet} userId={userId}/>} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
