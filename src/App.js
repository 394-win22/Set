import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClosetPage from "./pages/ClosetPage";
import CarouselPage from "./pages/CarouselPage";
import OutfitsPage from "./pages/OutfitsPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SlideRoutes from 'react-slide-routes';

function App() {
	return (
		<div>
			<BrowserRouter>
				<Header />
				<SlideRoutes>
					<Route exact path="/login" element={<LoginPage />} />
					<Route path="/" element={<ClosetPage />} />
					<Route path="/carousel" element={<CarouselPage />} />
					<Route path="/outfits" element={<OutfitsPage />} />
					<Route path="/user" element={<UserPage />} />
				</SlideRoutes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
