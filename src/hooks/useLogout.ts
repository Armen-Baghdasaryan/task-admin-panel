import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsAdmin, setLogoutSuccess } from '../store/auth';
import { AUTH_TOKEN_KEY } from '../common/storage-keys.ts';

export default function useLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return () => {
    dispatch(setLogoutSuccess());
    dispatch(setIsAdmin(false));
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate('/auth/login');
  };
}
