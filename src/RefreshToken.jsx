import {useState, useEffect} from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode"
import { useNavigate } from 'react-router-dom'

const RefreshToken = () => {

    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [expire, setExpire] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
      refreshToken(navigate);
    }, [navigate]);
  
    const refreshToken = async (navigate) => { 
      try {
        const response = await axios.get("http://localhost:5000/api/token");
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp)
        setLoading(false);
      } catch (error) {
        if(error.response){
          navigate("/");
          setLoading(false);
        }
      }
     }
  
     const axiosJWT = axios.create();
  
     axiosJWT.interceptors.request.use(async (config) =>{
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
          const response = await axios.get("http://localhost:5000/api/token");
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setName(decoded.name);
          setExpire(decoded.exp)
        }
  
        return config;
     }, (error) =>{
      return Promise.reject(error);
     });
  
     return {loading, name, token}
  
}

export default RefreshToken