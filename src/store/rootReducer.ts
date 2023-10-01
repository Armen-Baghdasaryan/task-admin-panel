import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'store/auth/slice.ts';

export const createRootReducer = () => {
  return combineReducers({
    auth: authReducer,
  });
};
