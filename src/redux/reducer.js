import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    id: 0,
    email: '',
    balance: 0,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.balance = action.payload.balance;
    },
  },
});

export default authSlice;
