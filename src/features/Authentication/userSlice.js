import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ?? null, //This will be whatever user we get from the backend, the response (jwt...)
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Registering the user
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, payload) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.user = null; //We couldn't authenticate the user
      });
  },
});

export default userSlice.reducer;
export const { reset, register } = userSlice.actions;
