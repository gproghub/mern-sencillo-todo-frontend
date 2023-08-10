import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todosService from '../../services/todosService';

const initialState = {
  todos: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

//Get list of to-dos
export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todosService.getTodos(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create to-do
export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todoData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todosService.createTodo(token, todoData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update to-do
export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async (todo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todosService.updateTodo(token, todo);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete to-do
export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await todosService.deleteTodo(token, todoId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTodos.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = payload;
      })
      .addCase(getTodos.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(createTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTodo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos.push(payload);
      })
      .addCase(createTodo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(deleteTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTodo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos = state.todos.filter((todo) => todo._id !== payload._id); //Siempre hay que mirar que estoy respondiendo desde el servidor.
      })
      .addCase(deleteTodo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(updateTodo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTodo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.todos.filter((todo) => todo.id === payload._id).text =
          payload.text;
      })
      .addCase(updateTodo.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export const { reset } = todosSlice.actions;
export default todosSlice.reducer;
