import React from "react";
import "./Header.css";
import { useLocation } from "react-router-dom";

const Header = () => {
	const { pathname } = useLocation();
	if (pathname === "/login") return null;

	return (
		<>
			<div className="header">
				<h1>SET</h1>
				<h3>SET your cloSET</h3>
			</div>
			<div className="header-margin"></div>
		</>
	);
};

export default Header;
