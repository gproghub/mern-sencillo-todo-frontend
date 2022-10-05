import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Authentication/authSlice';
import todosReducer from '../features/Todos/todosSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
  },
});
