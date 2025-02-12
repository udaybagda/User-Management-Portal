import axios from "axios";

const API_URL = "http://localhost:3001/users";

export const fetchUsers = async ()=>{
    const res = await axios.get(API_URL)
    return res.data
}
export const addUser = async (user) => {
    const response = await axios.post(API_URL, user);
    return response.data;
  };
  
export const updateUser = async (id, user) => {
    const response = await axios.put(`${API_URL}/${id}`, user);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};