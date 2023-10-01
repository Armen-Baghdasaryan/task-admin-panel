import { configureStore } from '@reduxjs/toolkit';
import { createRootReducer } from './rootReducer';


const rootReducer = createRootReducer();


export const store = configureStore({
  reducer: rootReducer,
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
