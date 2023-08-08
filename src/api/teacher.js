import axios from "axios";

const BASE_URL = 'http://localhost:8000/api/teacher';

const getToken = () => {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : null;
  };

export const login = async (email, password) => {
    console.log(email);
    console.log(password);
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            headers: {
                "Content-Type": "application/json",
              },
              email: email,
              password: password,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const fetchContents  = async () => {
    try {
        const response  = await axios.get(`${BASE_URL}/dashboard`,{
            headers: {
                Authorization: getToken(),
                "Content-Type": "application/json",
              },
        });
       // console.log(response.data);

        return response.data
        
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const fetchContentDetails = async (contentId) => {
    try {
        const response = await axios.get(`${BASE_URL}/content/${contentId}`, {
            headers: {
                Authorization: getToken(),
                "Content-Type": "application/json",
              },
        });

       // console.log(response.data);
        return response.data;
    } catch (error) {
        
    }
}