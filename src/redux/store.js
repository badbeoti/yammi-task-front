import {combineReducers} from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';
import authSlice from './reducer';

const reducer = combineReducers({
  authSlice: authSlice.reducer,
});

const store = configureStore({
  reducer,
});

export default store;
