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
  const body = {
    text: todoText,
  };
  const response = await axios.post(`${BASE_URL}`, body, config);
  return response.data;
};

const updateTodo = async (token, todo) => {
  const { _id, text } = todo;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(`${BASE_URL + _id}`, { text }, config);
  console.log(response.data);
  return response.data; //Whatever a respond from the updateTodo controller I will receive in response.data
};

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
  updateTodo,
  deleteTodo,
};

export default todosService;
