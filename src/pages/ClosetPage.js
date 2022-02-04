import { useState, useEffect } from "react";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-mui";
import { ClosetGrid } from "../components/ClosetPage/ClosetDisplay";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const options = {
	position: "top center",
	timeout: 5000,
	offset: "130px",
	transition: "scale",
	type: "success",
};

const ClosetPage = () => {
	const auth = getAuth();
	let [uid, setUID] = useState(null);
	let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (!authToken) {
            navigate('/login')
        }
    }, [navigate])
	onAuthStateChanged(auth, (authuser) => {
		if (authuser) {
		  	// The user's ID, unique to the Firebase project. Do NOT use
        	// this value to authenticate with the backend server
        	// Use User.getToken() instead.
        	setUID(authuser.uid);
		}
	  });
	
	return (
		<AlertProvider template={AlertTemplate} {...options}>
			<div>
				<ClosetGrid UID={uid} />
			</div>
		</AlertProvider>
	);
};

export default ClosetPage;
