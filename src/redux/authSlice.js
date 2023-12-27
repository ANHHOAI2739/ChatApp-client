import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  register: {
    user: null,
    isFetching: false,
    success: false,
    error: null,
  },
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.login.user = action.payload;
      state.login.isAuthenticated = true;
      state.login.isLoading = false;
      state.login.error = null;
    },
    loginFail: {
      reducer: (state, action) => {
        state.login.user = null;
        state.login.isAuthenticated = false;
        state.login.isLoading = false;
        state.login.error = action.payload;
      },
      prepare: (error) => {
        return { payload: error.response.data.message };
      },
    },

    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFail: {
      reducer: (state, action) => {
        state.register.isFetching = false;
        state.register.success = false;
        state.register.error = action.payload;
      },
      prepare: (error) => {
        return { payload: error.response.data.message };
      },
    },
    logout: (state) => {
      state.login.isAuthenticated = false;
      state.login.user = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFail,
  registerStart,
  registerSuccess,
  registerFail,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
