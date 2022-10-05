import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import todosService from '../../services/todosService';

//Get list of to-dos
export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async (_, thunkAPI) => {
    try {
      return await todosService.getTodos(thunkAPI.getState().auth.user.token);
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

//Create todo
export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todoData, thunkAPI) => {
    try {
      return await todosService.createTodo(
        thunkAPI.getState().auth.user.token,
        todoData
      );
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

const initialState = {
  todos: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

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
      });
  },
});

export const { reset } = todosSlice.actions;
export default todosSlice.reducer;