import axios from 'axios';

const BASE_URL = 'http://localhost:3005/api/v1';

const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/register`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const loginUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/login`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logoutUser =  () => {
  localStorage.removeItem('user');
};

const authService = {
  registerUser,
  logoutUser,
  loginUser,
};

export default authService;
