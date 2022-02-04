import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Form from '../components/LoginForm'

const LoginPage = () => {
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')
        if (authToken) {
            navigate('/closet');
        }
    }, [navigate])
    return (
        <Form />
    )
};

export default LoginPage;