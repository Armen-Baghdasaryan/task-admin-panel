import { Button } from 'antd';
import { AUTH_TOKEN_KEY } from 'common/storage-keys';
import { useDispatch } from 'react-redux';
import { setAuthSuccess, setIsAdmin } from 'store/auth';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const login = () => {
    dispatch(setAuthSuccess());
    localStorage.setItem(AUTH_TOKEN_KEY, 'fake_token');
  };
  const loginAdmin = () => {
    dispatch(setIsAdmin(true));
    login();
  };

  return (
    <div className="py-40">
      <div className="fw-700 fs-24">Login Page</div>
      <div className="mt-20">
        <Button onClick={login}>Login</Button>
        <Button type="primary" className="ml-20" onClick={loginAdmin}>
          Login Admin
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
