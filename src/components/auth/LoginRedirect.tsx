import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogoutSuccess } from '../../store/auth';

type TProps = {
  children?: React.ReactNode;
};

export const LoginRedirect: React.FC<TProps> = ({ children }: TProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLogoutSuccess());

    let continueUrl = '/';
    if (!location.pathname.includes('/auth')) {
      continueUrl = location.pathname + location.search;
    }

    navigate(`/login?continue=${continueUrl}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
