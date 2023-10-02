import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoginReturn } from 'components/auth/LoginReturn';
import { LoginError } from 'components/auth/LoginError';
import { getAuthError, getAuthPhase, getUserToken, setAuthSuccess } from 'store/auth';
import { AuthPhase } from '../common/enums.ts';
import { AUTH_TOKEN_KEY } from '../common/storage-keys.ts';
import { LoginRedirect } from 'components/auth/LoginRedirect.tsx';

type Props = {
  children: React.ReactNode;
};

export const AuthWrapper: React.FC<Props> = ({ children }: Props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const authPhase = useSelector(getAuthPhase);
  const authError = useSelector(getAuthError);
  const userToken = useSelector(getUserToken);

  useEffect(() => {
    if (authPhase === AuthPhase.Init) {
      // TODO implement user data get with token
      // TODO if token is jwt check is expired here
      if (localStorage.getItem(AUTH_TOKEN_KEY)) {
        dispatch(setAuthSuccess());
      } else {
        navigate('/auth/login');
      }
    }
  }, [authPhase, dispatch, navigate]);

  switch (authPhase) {
    case AuthPhase.Init:
      return !userToken ? <LoginRedirect /> : <div data-testid={'init-screen'} />;
    case AuthPhase.Success:
      return pathname === '/auth/login' ? <LoginReturn /> : <>{children}</>;
    case AuthPhase.Logout:
      return <>{children}</>;
    case AuthPhase.Error:
      // This handles case when we get some error from identity and want to react accordingly.
      return <LoginError error={authError} />;
    default:
      return <>Unknown authentication phase</>;
  }
};
