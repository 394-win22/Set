import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClosetPage from './pages/ClosetPage';
import RecommendPage from './pages/RecommendPage';
import NewItemPage from './pages/NewItemPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ClosetPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/additem" element={<NewItemPage/>} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;
