import axios from 'axios';

const BASE_URL = 'http://localhost:3005/api/v1/todos/';

const getTodos = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${BASE_URL}`, config);
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
  const response = await axios.post(`${BASE_URL}`, bodyData, config);
  return response.data;
};

// const updateTodo = async(token, todoData)


const deleteTodo = async (token, todoId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${BASE_URL + todoId}`, config);
  return response.data;
};

const todosService = {
  getTodos,
  createTodo,
  deleteTodo
};

export default todosService;
