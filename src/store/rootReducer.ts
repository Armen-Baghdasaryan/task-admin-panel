import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'store/auth/slice.ts';
import productsReducer from 'store/products/slice.ts';
import basketReducer from 'store/basket/slice.ts';

export const createRootReducer = () => {
  return combineReducers({
    auth: authReducer,
    products: productsReducer,
    basket: basketReducer,
  });
};
