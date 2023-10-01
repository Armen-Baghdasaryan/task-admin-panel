import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthPhase } from '../../common/enums.ts';
import { AUTH_TOKEN_KEY, IS_ADMIN_KEY } from '../../common/storage-keys.ts';

export type TAuthState = {
  phase: AuthPhase;
  error: string | null;
  userToken: string | null;
  isSuccessRequest: boolean;
  isSuccessRegister: boolean;
  registerError: string | null;
  isAdmin: boolean;
};

const initialState: TAuthState = {
  phase: AuthPhase.Init,
  error: null,
  userToken: localStorage.getItem(AUTH_TOKEN_KEY),
  isSuccessRequest: false,
  isSuccessRegister: false,
  registerError: null,
  isAdmin: !!localStorage.getItem(IS_ADMIN_KEY),
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthSuccess(state) {
      state.phase = AuthPhase.Success;
      state.error = null;
    },
    setAuthError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.phase = AuthPhase.Error;
    },
    setLogoutSuccess(state) {
      state.phase = AuthPhase.Logout;
      state.error = null;
    },
    setRegisterRequestSuccess(state, action: PayloadAction<string>) {
      state.registerError = null;
      state.userToken = action.payload;
      state.isSuccessRequest = true;
    },
    setRegisterRequestError(state, action: PayloadAction<string>) {
      state.registerError = action.payload;
      state.isSuccessRequest = false;
    },
    setRegisterSuccess(state) {
      state.registerError = null;
      state.isSuccessRequest = false;
      state.isSuccessRegister = true;
    },
    setRegisterError(state, action: PayloadAction<string>) {
      state.registerError = action.payload;
      state.isSuccessRequest = false;
      state.isSuccessRegister = false;
    },
    setIsAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
      localStorage.setItem(IS_ADMIN_KEY, String(state.isAdmin));
    },
  },
});

export const {
  setAuthSuccess,
  setAuthError,
  setLogoutSuccess,
  setRegisterRequestSuccess,
  setRegisterRequestError,
  setRegisterSuccess,
  setRegisterError,
  setIsAdmin,
} = auth.actions;

export default auth.reducer;
