import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { getIsAdmin } from '../../store/auth';

export const LoginReturn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = useSelector(getIsAdmin);

  useEffect(() => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });

    let url = '/';
    if (params.continue) {
      url = decodeURI(params.continue as string);
    }
    if (isAdmin && !url.startsWith('/admin')) {
      url = '/admin';
    }

    navigate(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
