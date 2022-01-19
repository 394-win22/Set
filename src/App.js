import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClosetPage from "./pages/ClosetPage";
import RecommendPage from "./pages/RecommendPage";
import NewItemPage from "./pages/NewItemPage";
import OutfitsPage from "./pages/OutfitsPage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import Footer from "./components/Footer";

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route exact path="/login" element={<LoginPage />} />
					<Route path="/" element={<ClosetPage />} />
					<Route path="/recommend" element={<RecommendPage />} />
					{/* <Route path="/additem" element={<NewItemPage />} /> */}
					<Route path="/outfits" element={<OutfitsPage />} />
					<Route path="/user" element={<UserPage />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
