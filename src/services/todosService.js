import axios from 'axios';

const BASE_URL = 'http://localhost:3005/api/v1';

const getTodos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BASE_URL}/todos`, config);
  return response.data;
};

const createTodo = async (token, todoText) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const bodyData = {
    text: todoText,
  };
  const response = await axios.post(`${BASE_URL}/todos`, bodyData, config);
  return response.data;
};

const todosService = {
  getTodos,
  createTodo,
};

export default todosService;
