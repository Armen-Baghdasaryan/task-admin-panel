import { createSelector } from '@reduxjs/toolkit';
import { TRootState } from 'store';
import { TAuthState } from './slice';

const getState = (state: TRootState): TAuthState => state.auth;

export const getAuthPhase = createSelector(getState, (state) => state.phase);
export const getAuthError = createSelector(getState, (state) => state.error);
export const getUserToken = createSelector(getState, (state) => state.userToken);
export const isSuccessRequest = createSelector(getState, (state) => state.isSuccessRequest);
export const isSuccessRegister = createSelector(getState, (state) => state.isSuccessRegister);
export const registerError = createSelector(getState, (state) => state.registerError);
export const getIsAdmin = createSelector(getState, (state) => state.isAdmin);
