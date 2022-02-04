import { useState, useEffect } from "react";
import OutfitDisplay from "../components/CarouselPage/OutfitDisplay";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const CarouselPage = () => {
	const auth = getAuth();
	let [uid, setUID] = useState(null);
	let navigate = useNavigate();
	onAuthStateChanged(auth, (authuser) => {
		if (authuser) {
		  	// The user's ID, unique to the Firebase project. Do NOT use
        	// this value to authenticate with the backend server
        	// Use User.getToken() instead.
        	setUID(authuser.uid);
		}
	  });

    useEffect(() => {
        if (!auth) {
            navigate('/login')
        }
    }, [navigate])
	return (
			<div>
				<OutfitDisplay UID={uid} />
			</div>
	);
};

export default CarouselPage;
