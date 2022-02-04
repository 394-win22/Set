import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
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
					<Route exact path="/closet" element={<ClosetPage />} />
					<Route exact path="/carousel" element={<CarouselPage />} />
					<Route exact path="/outfits" element={<OutfitsPage />} />
					<Route exact path="/user" element={<UserPage />} />
					<Route path="*" element={<ClosetPage />} />
				</SlideRoutes>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
