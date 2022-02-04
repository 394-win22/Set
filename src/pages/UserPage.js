import {useEffect} from 'react';
import UserBox from '../components/UserBox'
import { useNavigate } from "react-router-dom";

const UserPage = (props) => {
  let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (!authToken) {
            navigate('/login')
        }
    }, [navigate])
  return (
      <div>
        <UserBox />
      </div>
  )
};

export default UserPage;